import { PageInfo } from "@/domain/models/commons/pagination/PageInfo";
import { FormCompareItemVm } from "../Models";
import { QueryFormsToCompareRes } from "@/domain/models/admin/forms/compare/QueryFormsToCompareRes";

export class QueryFormsToCompareResVm {
    pageInfo: PageInfo;
    items: FormCompareItemVm[];

    constructor(model: QueryFormsToCompareRes) {
        this.pageInfo = model.pageInfo;
        this.items = model.items.map((e) => new FormCompareItemVm(e));
    }
}