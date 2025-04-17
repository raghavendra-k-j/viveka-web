'use client';

import { AppException } from "@/core/exceptions/AppException";
import { DataState } from "@/ui/utils/datastate";
import { makeAutoObservable, observable, reaction, runInAction } from "mobx";
import { AdminFormStore } from "../store";
import { ComparisonRecommendations } from "@/domain/models/admin/forms/compare/ComparisonRecommendations";
import { FormCompareItem } from "@/domain/models/admin/forms/compare/FormCompareItem";
import { debounce } from "lodash";
import { CompareStore } from "./compareStore";
import { FormCompareUserListReq } from "@/domain/models/admin/forms/compare/FormCompareUserListReq";
import { FormComparisonOverviewReq } from "@/domain/models/admin/forms/compare/FormComparisonOverviewReq";
import { ResEither } from "@/core/utils/ResEither";
import { FormCompareDetails } from "@/domain/models/admin/forms/compare/FormCompareDetails";

export enum CompareTabFragment {
    SELECT_FORM, RESULT_PAGE
}


export class AdminFormCompareStore {
    parentStore: AdminFormStore;
    recommendationsState = DataState.initial<ComparisonRecommendations>();
    currentFragment = CompareTabFragment.SELECT_FORM;
    compareStore?: CompareStore;


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

    onFormSelected(form: FormCompareItem) {
        runInAction(() => {
            this.compareStore = CompareVm.fromFrom(form);

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
            this.currentFragment = CompareTabFragment.RESULT_PAGE;
        });
    }


    async getFormCompareDetails({ formBId }: { formBId: number }): Promise<ResEither<AppException, FormCompareDetails>> {
        try {
            const res = (await this.parentStore.adminFormsService.getFormCompareDetails(this.parentStore.formDetail.id, formBId)).getOrThrow();
            return ResEither.success(res);
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
            const res = (await this.parentStore.adminFormsService.getComparisonOverview(req)).getOrThrow();
            runInAction(() => this.compareStore!.overViewState = DataState.success(res));
        } catch (error) {
            const e = AppException.fromAny(error);
            runInAction(() => this.compareStore!.overViewState = DataState.error({ error: e }));
        }
    }

    async queryComparisonRecommendations() {
        try {
            runInAction(() => this.recommendationsState = DataState.loading());
            let response = (await this.parentStore.adminFormsService.queryComparisonRecommendations(this.parentStore.formDetail.id)).getOrThrow();
            runInAction(() => this.recommendationsState = DataState.success(response));
        }
        catch (error) {
            const e = AppException.fromAny(error);
            runInAction(() => this.recommendationsState = DataState.error({ error: e }));
        }
    }

    async getComparisonUserList(props: { page?: number }) {
        if (!this.compareStore) return;
        runInAction(() => this.compareStore!.usersState = DataState.loading());
        const req = new FormCompareUserListReq({ formAId: this.compareStore.formA.id, formBId: this.compareStore.formB.id, formALabel: "Pre-Traning", formBLabel: "Post-Training", page: props.page ?? 1, pageSize: 10, searchQuery: this.compareStore.searchQuery });
        try {
            const res = (await this.parentStore.adminFormsService.getComparisonUserList(req)).getOrThrow();
            runInAction(() => this.compareStore!.usersState = DataState.success(res));
        } catch (error) {
            const e = AppException.fromAny(error);
            runInAction(() => this.compareStore!.usersState = DataState.error({ error: e }));
        }
    }



    dispose() {

    }

}