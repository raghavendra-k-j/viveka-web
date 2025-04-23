import { makeAutoObservable, reaction, runInAction } from "mobx";
import debounce from "lodash/debounce";
import { AppException } from "@/core/exceptions/AppException";
import { DataState } from "@/ui/utils/datastate";
import { StringUtils } from "@/core/utils/StringUtils";
import { QueryFormsToCompareReq } from "@/domain/models/admin/forms/compare/QueryFormsToCompareReq";
import { AdminFormCompareStore } from "../store";
import { QueryFormsToCompareResVm } from "./Models";
import { FormCompareDetailsVm, FormCompareItemVm } from "../Models";
import { withMinimumDelay } from "@/ui/utils/withMinimumDelay";
import { searchDebounce } from "@/ui/utils/searchDebounce";
import { toast } from "sonner";

export class SelectFormDialogStore {

    parentStore: AdminFormCompareStore;
    loadState: DataState<QueryFormsToCompareResVm>;
    searchQuery: string;
    currentPage: number;
    selectedForm?: FormCompareItemVm;
    pageSize: number;
    private debouncedLoadData: () => void;

    get data() {
        return this.loadState.data!;
    }

    constructor(params: { parentStore: any }) {
        this.parentStore = params.parentStore;
        this.loadState = DataState.initial();
        this.searchQuery = "";
        this.currentPage = 1;
        this.pageSize = 30;
        makeAutoObservable(this, {
            loadState: true,
            searchQuery: true,
            currentPage: true,
            selectedForm: true,
        });
        this.debouncedLoadData = searchDebounce(() => this.loadData(1));
        this.initializeReactions();
    }

    private initializeReactions() {
        reaction(
            () => this.searchQuery,
            () => {
                this.debouncedLoadData();
            }
        );
    }

    onSearchQueryChange(query: string) {
        this.searchQuery = query;
    }

    get isPaginationRequired() {
        return this.data.pageInfo.totalPages > 1;
    }


    async loadData(page = this.currentPage) {
        try {
            runInAction(() => (this.loadState = DataState.loading()));

            const req = new QueryFormsToCompareReq({
                searchQuery: StringUtils.trimToUndefined(this.searchQuery),
                formId: this.parentStore.formDetail.id,
                page,
                pageSize: this.pageSize,
            });

            const response = await withMinimumDelay(
                this.parentStore.parentStore.adminFormsService.queryFormsToCompare(req),
            );
            const data = response.getOrThrow();

            runInAction(() => {
                this.loadState = DataState.success(new QueryFormsToCompareResVm(data));
                this.currentPage = page;
            });
        } catch (error) {
            const e = AppException.fromAny(error);
            runInAction(() => (this.loadState = DataState.error({ error: e })));
        }
    }


    goToPage(page: number) {
        if (page !== this.currentPage) {
            this.loadData(page);
        }
    }


    async onFormSelected(item: FormCompareItemVm): Promise<void> {
        if (this.selectedForm === item) {
            if (item.detailState.isError && item.detailState.error) {
                this.showErrorToast(item.detailState.error);
            }
            return;
        }

        this.selectedForm = item;

        try {
            runInAction(() => item.detailState = DataState.loading());
            const data = (await this.parentStore.getFormCompareDetails({ formBId: item.item.id })).getOrThrow();
            runInAction(() => item.detailState = DataState.success(data));
            this.parentStore.onFormSelected(new FormCompareDetailsVm(data));
        } catch (error) {
            const e = AppException.fromAny(error);
            runInAction(() => item.detailState = DataState.error({ error: e }));
            this.showErrorToast(e);
        }
    }

    showErrorToast(e: AppException) {
        toast.error(e.message, {
            dismissible: true,
            duration: 3000,
            description: e.description,
            action: {
                label: 'OK',
                onClick: () => toast.dismiss(),
            },
        });
    }


}
