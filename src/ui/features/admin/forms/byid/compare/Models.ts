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
   
    base: FormCompareDetails;
    formALabel: string;
    formBLabel: string;
    isSameTotalMarks : boolean;

    reverse(): FormCompareDetailsVm {
        let newBase = this.base.reverse();
        return new FormCompareDetailsVm(newBase);
    }

    get formA(): FormCompareDetail {
        return this.base.formA;
    }

    get formB(): FormCompareDetail {
        return this.base.formB;
    }


    constructor(item: FormCompareDetails) {
        this.base = item;
        this.formALabel = this.base.formALabel;
        this.formBLabel = this.base.formBLabel;
        this.isSameTotalMarks = item.formA.totalMarks == item.formB.totalMarks;
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