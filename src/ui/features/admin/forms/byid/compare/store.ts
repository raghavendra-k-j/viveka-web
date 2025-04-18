'use client';

import { AppException } from "@/core/exceptions/AppException";
import { DataState } from "@/ui/utils/datastate";
import { makeAutoObservable, observable, reaction, runInAction } from "mobx";
import { AdminFormStore } from "../store";
import { ComparisonRecommendations } from "@/domain/models/admin/forms/compare/ComparisonRecommendations";
import { debounce } from "lodash";
import { CompareStore } from "./compareStore";
import { FormCompareUserListReq } from "@/domain/models/admin/forms/compare/FormCompareUserListReq";
import { FormComparisonOverviewReq } from "@/domain/models/admin/forms/compare/FormComparisonOverviewReq";
import { ResEither } from "@/core/utils/ResEither";
import { FormCompareDetails } from "@/domain/models/admin/forms/compare/FormCompareDetails";
import { FormCompareDetailsVm, FormCompareUserListVm } from "./Models";
import { withMinimumDelay } from "@/ui/utils/withMinimumDelay";
import { FormCompareUserList } from "@/domain/models/admin/forms/compare/FormCompareUserList";

export enum CompareTabFragment {
    SELECT_FORM, RESULT_PAGE
}


export class AdminFormCompareStore {
    parentStore: AdminFormStore;
    recommendationsState = DataState.initial<ComparisonRecommendations>();
    currentFragment = CompareTabFragment.SELECT_FORM;
    compareStore?: CompareStore;


    get compareFormDetails() {
        return this.compareStore!.formCompareDetails;
    }

    get usersData() {
        return this.compareStore!.usersState.data!;
    }


    get overviewState() {
        return this.compareStore!.overViewState;
    }

    get usersState() {
        return this.compareStore!.usersState;
    }

    get recommendationRes() {
        return this.recommendationsState.data!;
    }

    get formDetail() {
        return this.parentStore.formDetail;
    }

    constructor({ parentStore }: { parentStore: AdminFormStore }) {
        this.parentStore = parentStore;
        makeAutoObservable(this, {
            recommendationsState: observable,
            currentFragment: observable,
            compareStore: observable,
        });

        const debouncedFetchUsers = debounce(() => {
            if (this.compareStore) {
                this.getComparisonUserList({});
            }
        }, 300);

        reaction(
            () => this.compareStore?.searchQuery,
            () => {
                return debouncedFetchUsers();
            }
        );
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
        const req = new FormComparisonOverviewReq({ formAId: this.compareStore!.formA.id, formBId: this.compareStore!.formB!.id, formALabel: "Pre-Training", formBLabel: "Post-Traning" });
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
            runInAction(() => this.recommendationsState = DataState.loading());
            const response = await withMinimumDelay(this.parentStore.adminFormsService.queryComparisonRecommendations(this.parentStore.formDetail.id));
            const data = response.getOrThrow();
            runInAction(() => this.recommendationsState = DataState.success(data));
        }
        catch (error) {
            const e = AppException.fromAny(error);
            runInAction(() => this.recommendationsState = DataState.error({ error: e }));
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

    dispose() {

    }

}