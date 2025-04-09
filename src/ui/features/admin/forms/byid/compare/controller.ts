'use client';

import { AppException } from "@/core/exceptions/AppException";
import { DataState } from "@/ui/utils/datastate";
import { makeAutoObservable, observable, observe } from "mobx";
import { AdminFormLayoutStore } from "../controller";
import { CompareRecommendationRes } from "@/domain/models/admin/forms/compare/CompareRecommendationRes";



export enum CompareTabFragment {
    SELECT_FORM, RESULT_PAGE
}


export class AdminFormCompareStore {
    parentStore: AdminFormLayoutStore;
    recommendationsState = DataState.initial<CompareRecommendationRes>();
    currentFragment = CompareTabFragment.SELECT_FORM;

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
        });
        this.getRecommendations({ formId: this.formDetail.id });
    }

    async getRecommendations({ formId }: { formId: number }) {
        try {
            this.recommendationsState = DataState.loading();
            let response = (await this.parentStore.adminFormsService.getRecommendedFormsToCompare(formId)).getOrThrow();
            this.recommendationsState = DataState.success(response);
        }
        catch (error) {
            const e = AppException.fromAny(error);
            this.recommendationsState = DataState.error({ error: e });
        }
    }


    dispose() {

    }

}