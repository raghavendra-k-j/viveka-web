'use client';

import { makeObservable, observable, runInAction } from "mobx";
import { FormComparisonOverview } from "@/domain/models/admin/forms/compare/FormComparisonOverview";
import { FormCompareUserList } from "@/domain/models/admin/forms/compare/FormCompareUserList";
import { FormCompareDetails } from "@/domain/models/admin/forms/compare/FormCompareDetails";
import { FormCompareDetail } from "@/domain/models/admin/forms/compare/FormCompareDetail";
import { DataState } from "@/ui/utils/datastate";


type CompareStoreProps = {
    formCompareDetails: FormCompareDetails;
}

export class CompareStore {
    formCompareDetails: FormCompareDetails;
    overViewState = DataState.initial<FormComparisonOverview>();
    usersState = DataState.initial<FormCompareUserList>();
    searchQuery: string = "";

    get formA(): FormCompareDetail {
        return this.formCompareDetails.formA;
    }

    get formB(): FormCompareDetail {
        return this.formCompareDetails.formB;
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