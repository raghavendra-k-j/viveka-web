'use client';

import { AppException } from "@/core/exceptions/AppException";
import { DataState } from "@/ui/utils/datastate";
import { makeAutoObservable, makeObservable, observable, reaction, runInAction } from "mobx";
import { AdminFormLayoutStore } from "../controller";
import { CompareRecommendationRes } from "@/domain/models/admin/forms/compare/CompareRecommendationRes";
import { CompareFormItem } from "@/domain/models/admin/forms/compare/CompareFormItem";
import { FormComparisonOverviewReq, FormComparisonOverviewRes } from "@/domain/models/admin/forms/compare/FormComparisonOverview";
import { UserAssessmentCompareReq, UserAssessmentCompareRes } from "@/domain/models/admin/forms/compare/UserAssessmentCompareModel";
import { debounce } from "lodash";



export enum CompareTabFragment {
    SELECT_FORM, RESULT_PAGE
}

export class CompareVm {
    selectedForm?: CompareFormItem;
    overViewState = DataState.initial<FormComparisonOverviewRes>();
    usersState = DataState.initial<UserAssessmentCompareRes>();
    searchQuery: string = "";

    static fromFrom(form: CompareFormItem): CompareVm {
        const vm = new CompareVm();
        vm.selectedForm = form;
        return vm;
    }

    onSearchQueryChange(value: string): void {
        runInAction(() => this.searchQuery = value);
    }

    constructor() {
        makeObservable(this, {
            overViewState: observable,
            usersState: observable,
            searchQuery: observable,
        })
    }

}


export class AdminFormCompareStore {
    parentStore: AdminFormLayoutStore;
    recommendationsState = DataState.initial<CompareRecommendationRes>();
    currentFragment = CompareTabFragment.SELECT_FORM;
    compareVm?: CompareVm;


    get overviewState() {
        return this.compareVm!.overViewState;
    }

    get usersState() {
        return this.compareVm!.usersState;
    }

    get recommendationRes() {
        return this.recommendationsState.data!;
    }

    get formDetail() {
        return this.parentStore.formDetail;
    }

    constructor({ parentStore }: { parentStore: AdminFormLayoutStore }) {
        this.parentStore = parentStore;
        makeAutoObservable(this, {
            recommendationsState: observable,
            currentFragment: observable,
            compareVm: observable,
        });
        this.getRecommendations({ formId: this.formDetail.id });


        const debouncedFetchUsers = debounce(() => {
            if (this.compareVm) {
                this.getUsersComparison({ vm: this.compareVm });
            }
        }, 300);

        reaction(
            () => this.compareVm?.searchQuery,
            () => {
                console.log("Search query changed:", this.compareVm?.searchQuery);
                return debouncedFetchUsers();
            }
        );
    }

    onFormSelected(form: CompareFormItem) {
        runInAction(() => {
            this.compareVm = CompareVm.fromFrom(form);

            const debouncedFetchUsers = debounce(() => {
                this.getUsersComparison({ vm: this.compareVm! });
            }, 300);

            reaction(
                () => this.compareVm?.searchQuery,
                () => {
                    debouncedFetchUsers();
                }
            );
        });

        this.currentFragment = CompareTabFragment.RESULT_PAGE;
        this.loadOverview(this.compareVm!);
        this.getUsersComparison({ vm: this.compareVm! });
    }


    async loadOverview(vm: CompareVm) {
        runInAction(() => vm.overViewState = DataState.loading());
        const req = new FormComparisonOverviewReq({ formAId: this.formDetail.id, formBId: vm.selectedForm!.id, formALabel: "Form A", formBLabel: "Form B" });
        try {
            const res = (await this.parentStore.adminFormsService.getComparisonOverview(req)).getOrThrow();
            runInAction(() => vm.overViewState = DataState.success(res));
        } catch (error) {
            const e = AppException.fromAny(error);
            runInAction(() => vm.overViewState = DataState.error({ error: e }));
        }
    }

    async getRecommendations({ formId }: { formId: number }) {
        try {
            runInAction(() => this.recommendationsState = DataState.loading());
            let response = (await this.parentStore.adminFormsService.getRecommendedFormsToCompare(formId)).getOrThrow();
            runInAction(() => this.recommendationsState = DataState.success(response));
        }
        catch (error) {
            const e = AppException.fromAny(error);
            runInAction(() => this.recommendationsState = DataState.error({ error: e }));
        }
    }

    async getUsersComparison({ vm, page }: { vm: CompareVm, page?: number }) {
        runInAction(() => vm.usersState = DataState.loading());
        const req = new UserAssessmentCompareReq({ formAId: this.formDetail.id, formBId: vm.selectedForm!.id, formALabel: "Form A", formBLabel: "Form B", page: page ?? 1, pageSize: 1, searchQuery: vm.searchQuery });
        try {
            const res = (await this.parentStore.adminFormsService.getIndividualUsersComparison(req)).getOrThrow();
            runInAction(() => vm.usersState = DataState.success(res));
        } catch (error) {
            const e = AppException.fromAny(error);
            runInAction(() => vm.usersState = DataState.error({ error: e }));
        }
    }



    dispose() {

    }

}