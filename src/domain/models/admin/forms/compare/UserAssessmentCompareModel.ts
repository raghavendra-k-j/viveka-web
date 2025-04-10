import { JSONParams } from "@/core/types/JSONParams";
import { UserAssessmentCompareItem } from "./UserAssessmentCompareItem";
import { PageInfo } from "@/domain/models/commons/pagination/pageinfo";

type UserAssessmentCompareReqProps = {
    formAId: number;
    formBId: number;
    formALabel: string;
    formBLabel: string;
    searchQuery?: string;
    page: number;
    pageSize: number;
}

export class UserAssessmentCompareReq {
    formAId: number;
    formBId: number;
    formALabel: string;
    formBLabel: string;
    searchQuery?: string;
    page: number;
    pageSize: number;

    constructor(props: UserAssessmentCompareReqProps) {
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
            searchQuery: this.searchQuery,
            page: this.page,
            pageSize: this.pageSize
        }
    }
}


type UserAssessmentCompareResProps = {
    items: UserAssessmentCompareItem[];
    pageInfo: PageInfo;
    formALabel: string;
    formBLabel: string;
}

export class UserAssessmentCompareRes {
    items: UserAssessmentCompareItem[];
    pageInfo: PageInfo;
    formALabel: string;
    formBLabel: string;

    constructor(props: UserAssessmentCompareResProps) {
        this.items = props.items;
        this.pageInfo = props.pageInfo;
        this.formALabel = props.formALabel;
        this.formBLabel = props.formBLabel;
    }

    static fromJson(json: JSONParams): UserAssessmentCompareRes {
        return new UserAssessmentCompareRes({
            items: json.items.map((item: JSONParams) => UserAssessmentCompareItem.fromJson(item)),
            pageInfo: PageInfo.fromJson(json.pageInfo),
            formALabel: json.formALabel,
            formBLabel: json.formBLabel,
        });
    }
}
