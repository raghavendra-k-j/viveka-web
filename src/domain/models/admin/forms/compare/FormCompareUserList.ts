import { PageInfo } from "@/domain/models/commons/pagination/PageInfo";
import { FormCompareUserItem } from "./FormCompareUserItem";
import { JSONParams } from "@/core/types/JSONParams";

type FormCompareUserListProps = {
    formALabel: string;
    formBLabel: string;
    items: FormCompareUserItem[];
    pageInfo: PageInfo;
}


export class FormCompareUserList {
    formALabel: string;
    formBLabel: string;
    items: FormCompareUserItem[];
    pageInfo: PageInfo;

    constructor(props: FormCompareUserListProps) {
        this.formALabel = props.formALabel;
        this.formBLabel = props.formBLabel;
        this.items = props.items;
        this.pageInfo = props.pageInfo;
    }

    static fromJson(json: JSONParams): FormCompareUserList {
        return new FormCompareUserList({
            formALabel: json.formALabel,
            formBLabel: json.formBLabel,
            items: json.items.map((item: JSONParams) => FormCompareUserItem.fromJson(item)),
            pageInfo: PageInfo.fromJson(json.pageInfo)
        });
    }

}


