import { FormCompareDetail } from "@/domain/models/admin/forms/compare/FormCompareDetail";
import { FormCompareDetails } from "@/domain/models/admin/forms/compare/FormCompareDetails";
import { FormCompareItem } from "@/domain/models/admin/forms/compare/FormCompareItem";
import { FormCompareUserItem } from "@/domain/models/admin/forms/compare/FormCompareUserItem";
import { FormCompareUserList } from "@/domain/models/admin/forms/compare/FormCompareUserList";
import { PageInfo } from "@/domain/models/commons/pagination/PageInfo";
import { NumChangeMetric } from "@/domain/utils/NumberChangeMetric";
import { DataState } from "@/ui/utils/datastate";
import { makeObservable, observable } from "mobx";

export class FormCompareItemVm {
    item: FormCompareItem;
    detailState: DataState<FormCompareDetails>;

    constructor(item: FormCompareItem) {
        this.item = item;
        this.detailState = DataState.initial<FormCompareDetails>();
        makeObservable(this, {
            detailState: observable,
        });
    }
}


export class FormCompareDetailsVm {
    item: FormCompareDetails;
    formALabel: string;
    formBLabel: string;

    get formA(): FormCompareDetail {
        return this.item.formA;
    }

    get formB(): FormCompareDetail {
        return this.item.formB;
    }


    constructor(item: FormCompareDetails) {
        this.item = item;
        this.formALabel = "Assessment A";
        this.formBLabel = "Assessment B";
        makeObservable(this, {
            formALabel: observable,
            formBLabel: observable,
        });
    }

}



export class FormCompareUserItemVm {
    base: FormCompareUserItem;
    marksChange: NumChangeMetric;
    timeTakenChange: NumChangeMetric;

    constructor(item: FormCompareUserItem) {
        this.base = item;
        this.marksChange = NumChangeMetric.calculateChange(item.formA.marks, item.formB.marks);
        this.timeTakenChange = NumChangeMetric.calculateChange(item.formA.timeTaken, item.formB.timeTaken);
    }
}

export class FormCompareUserListVm {
    items: FormCompareUserItemVm[];
    pageInfo: PageInfo;

    constructor(data: FormCompareUserList) {
        this.items = data.items.map(item => new FormCompareUserItemVm(item));
        this.pageInfo = data.pageInfo;
    }
}