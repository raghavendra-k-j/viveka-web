import { JSONParams } from "@/core/types/JSONParams";

type FormCompareUserListReqProps = {
    formAId: number;
    formBId: number;
    formALabel: string;
    formBLabel: string;
    searchQuery?: string;
    page: number;
    pageSize: number;
}

export class FormCompareUserListReq {
    formAId: number;
    formBId: number;
    formALabel: string;
    formBLabel: string;
    searchQuery?: string;
    page: number;
    pageSize: number;

    constructor(props: FormCompareUserListReqProps) {
        this.formAId = props.formAId;
        this.formBId = props.formBId;
        this.formALabel = props.formALabel;
        this.formBLabel = props.formBLabel;
        this.searchQuery = props.searchQuery;
        this.page = props.page;
        this.pageSize = props.pageSize;
    }

    toJson(): JSONParams {
        return {
            formAId: this.formAId,
            formBId: this.formBId,
            formALabel: this.formALabel,
            formBLabel: this.formBLabel,
            searchQuery: this.searchQuery,
            page: this.page,
            pageSize: this.pageSize
        }
    }
}