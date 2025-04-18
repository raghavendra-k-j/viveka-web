'use client';

import { makeObservable, observable, runInAction } from "mobx";
import { FormComparisonOverview } from "@/domain/models/admin/forms/compare/FormComparisonOverview";
import { FormCompareDetail } from "@/domain/models/admin/forms/compare/FormCompareDetail";
import { DataState } from "@/ui/utils/datastate";
import { FormCompareDetailsVm, FormCompareUserListVm } from "./Models";


type CompareStoreProps = {
    formCompareDetails: FormCompareDetailsVm;
}

export class CompareStore {
    formCompareDetails: FormCompareDetailsVm;
    overViewState = DataState.initial<FormComparisonOverview>();
    usersState = DataState.initial<FormCompareUserListVm>();
    searchQuery: string = "";

    get formA(): FormCompareDetail {
        return this.formCompareDetails.item.formA;
    }

    get formB(): FormCompareDetail {
        return this.formCompareDetails.item.formB;
    }

    onSearchQueryChange(value: string): void {
        runInAction(() => this.searchQuery = value);
    }

    constructor(props: CompareStoreProps) {
        this.formCompareDetails = props.formCompareDetails;
        makeObservable(this, {
            overViewState: observable,
            usersState: observable,
            searchQuery: observable,
        })
    }

}