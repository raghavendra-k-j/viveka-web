import { makeAutoObservable, reaction, runInAction } from "mobx";
import debounce from "lodash/debounce";
import { AppException } from "@/core/exceptions/AppException";
import { DataState } from "@/ui/utils/datastate";
import { StringUtils } from "@/core/utils/StringUtils";
import { QueryFormsToCompareRes } from "@/domain/models/admin/forms/compare/QueryFormsToCompareRes";
import { QueryFormsToCompareReq } from "@/domain/models/admin/forms/compare/QueryFormsToCompareReq";
import { AdminFormCompareStore } from "../store";

export class SelectFormDialogStore {
    parentStore: AdminFormCompareStore;
    loadState: DataState<QueryFormsToCompareRes>;
    searchQuery: string;
    currentPage: number;
    private debouncedLoadData: () => void;

    get data() {
        return this.loadState.data!;
    }

    constructor(params: { parentStore: any }) {
        this.parentStore = params.parentStore;
        this.loadState = DataState.initial();
        this.searchQuery = "";
        this.currentPage = 1;


        makeAutoObservable(this, {
            loadState: true,
            searchQuery: true,
            currentPage: true,
        });
        this.debouncedLoadData = debounce(() => this.loadData(1), 300);
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

    async loadData(page = this.currentPage) {
        try {
            runInAction(() => (this.loadState = DataState.loading()));

            const req = new QueryFormsToCompareReq({
                searchQuery: StringUtils.trimToUndefined(this.searchQuery),
                formId: this.parentStore.formDetail.id,
                page,
                pageSize: 2,
            });

            const data = (await this.parentStore.parentStore.adminFormsService.queryFormsToCompare(req)).getOrThrow();


            runInAction(() => {
                this.loadState = DataState.success(data);
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
}
