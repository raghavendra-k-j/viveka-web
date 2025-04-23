'use client';

import { AppException } from "@/core/exceptions/AppException";
import { DataState } from "@/ui/utils/datastate";
import { action, makeAutoObservable, observable, reaction, runInAction } from "mobx";
import { AdminFormStore } from "../store";
import { FormCompareMetaData } from "@/domain/models/admin/forms/compare/FormCompareMetaData";
import { debounce } from "lodash";
import { CompareStore } from "./compareStore";
import { FormCompareUserListReq } from "@/domain/models/admin/forms/compare/FormCompareUserListReq";
import { FormComparisonOverviewReq } from "@/domain/models/admin/forms/compare/FormComparisonOverviewReq";
import { ResEither } from "@/core/utils/ResEither";
import { FormCompareDetails } from "@/domain/models/admin/forms/compare/FormCompareDetails";
import { FormCompareDetailsVm, FormCompareUserListVm } from "./Models";
import { withMinimumDelay } from "@/ui/utils/withMinimumDelay";
import { searchDebounce } from "@/ui/utils/searchDebounce";

export enum CompareTabFragment {
    SELECT_FORM, RESULT_PAGE
}


export class UsersTableOption {
    showPassStatusColumn: boolean;
    showTimeTakenColumn: boolean;

    constructor() {
        this.showPassStatusColumn = false;
        this.showTimeTakenColumn = false;
        makeAutoObservable(this, {
            showPassStatusColumn: observable,
            showTimeTakenColumn: observable,
        });
    }

    setShowPassStatusColumn = (value: boolean) => {
        runInAction(() => {
            this.showPassStatusColumn = value;
        });
    }

    setShowTimeTakenColumn = (value: boolean) => {
        runInAction(() => {
            this.showTimeTakenColumn = value;
        });
    }
}


export class AdminFormCompareStore {

    parentStore: AdminFormStore;
    metaDatState = DataState.initial<FormCompareMetaData>();
    currentFragment = CompareTabFragment.SELECT_FORM;
    compareStore?: CompareStore;
    userTableOptions: UsersTableOption = new UsersTableOption();


    get compareFormDetails() {
        return this.compareStore!.formCompareDetails;
    }

    get usersData() {
        return this.compareStore!.usersState.data!;
    }


    get overviewState() {
        return this.compareStore!.overViewState;
    }


    get overviewData() {
        return this.compareStore!.overViewState.data!;
    }


    get usersState() {
        return this.compareStore!.usersState;
    }

    get metaData() {
        return this.metaDatState.data!;
    }

    get formDetail() {
        return this.parentStore.formDetail;
    }



    constructor({ parentStore }: { parentStore: AdminFormStore }) {
        this.parentStore = parentStore;
        makeAutoObservable(this, {
            metaDatState: observable,
            currentFragment: observable,
            compareStore: observable,
        });

        const debouncedFetchUsers = searchDebounce(() => {
            if (!this.compareStore) return;
            this.getComparisonUserList({});
        });

        reaction(() => this.compareStore?.searchQuery, () => debouncedFetchUsers());
    }

    onFormSelected(form?: FormCompareDetailsVm) {
        if (!form) {
            this.currentFragment = CompareTabFragment.SELECT_FORM;
            this.compareStore = undefined;
            return;
        }

        runInAction(() => {
            const debouncedFetchUsers = debounce(() => {
                this.getComparisonUserList({});
            }, 300);

            reaction(
                () => this.compareStore?.searchQuery,
                () => {
                    debouncedFetchUsers();
                }
            );
        });
        runInAction(() => {
            this.compareStore = new CompareStore({ formCompareDetails: form, });
            this.currentFragment = CompareTabFragment.RESULT_PAGE;
        });
    }


    async getFormCompareDetails({ formBId }: { formBId: number }): Promise<ResEither<AppException, FormCompareDetails>> {
        try {
            const res = await withMinimumDelay(this.parentStore.adminFormsService.getFormCompareDetails(this.parentStore.formDetail.id, formBId));
            const data = res.getOrThrow();
            return ResEither.success(data);
        }
        catch (error) {
            const e = AppException.fromAny(error);
            return ResEither.failure(e);
        }
    }


    async getComparisonOverview() {
        runInAction(() => this.compareStore!.overViewState = DataState.loading());
        const req = new FormComparisonOverviewReq({ formAId: this.compareStore!.formA.id, formBId: this.compareStore!.formB!.id, formALabel: this.compareStore!.formCompareDetails.formALabel, formBLabel: this.compareStore!.formCompareDetails.formBLabel });
        try {
            const res = await withMinimumDelay(this.parentStore.adminFormsService.getComparisonOverview(req));
            const data = res.getOrThrow();
            runInAction(() => this.compareStore!.overViewState = DataState.success(data));
        } catch (error) {
            const e = AppException.fromAny(error);
            runInAction(() => this.compareStore!.overViewState = DataState.error({ error: e }));
        }
    }

    async queryComparisonRecommendations() {
        try {
            runInAction(() => this.metaDatState = DataState.loading());
            const response = await withMinimumDelay(this.parentStore.adminFormsService.queryComparisonRecommendations(this.parentStore.formDetail.id));
            const data = response.getOrThrow();
            runInAction(() => this.metaDatState = DataState.success(data));
        }
        catch (error) {
            const e = AppException.fromAny(error);
            runInAction(() => this.metaDatState = DataState.error({ error: e }));
        }
    }

    async getComparisonUserList({ page = 1 }: { page?: number }) {
        if (!this.compareStore) return;
        runInAction(() => this.compareStore!.usersState = DataState.loading());
        const req = new FormCompareUserListReq({
            formAId: this.compareStore.formA.id,
            formBId: this.compareStore.formB.id,
            formALabel: "Pre-Traning",
            formBLabel: "Post-Training",
            page,
            pageSize: 10,
            searchQuery: this.compareStore.searchQuery,
        });
        try {
            const res = await withMinimumDelay(this.parentStore.adminFormsService.getComparisonUserList(req));
            const data = res.getOrThrow();
            runInAction(() => this.compareStore!.usersState = DataState.success(new FormCompareUserListVm(data)));
        } catch (error) {
            const e = AppException.fromAny(error);
            runInAction(() => this.compareStore!.usersState = DataState.error({ error: e }));
        }
    }

    updateFormBLabel(newLabel: string) {
        if (!this.compareStore) return;
        runInAction(() => {
            this.compareFormDetails.formBLabel = newLabel;
            this.compareFormDetails.base.formALabel = newLabel;
            this.getComparisonOverview();
        });
    }

    updateFormALabel(newLabel: string) {
        if (!this.compareStore) return;
        runInAction(() => {
            this.compareFormDetails.formALabel = newLabel;
            this.compareFormDetails.base.formALabel = newLabel;
            this.getComparisonOverview();
        });
    }

    dispose() {

    }

}