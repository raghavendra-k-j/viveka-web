import { JSONParams } from "@/core/types/JSONParams";
import { AssessmentType } from "@/domain/models/commons/forms/AssessmentType";


type QueryFormsToCompareReqProps = {
    formId: number;
    searchQuery?: string;
    assessmentType?: AssessmentType;
    page: number;
    pageSize: number;
}

export class QueryFormsToCompareReq {
    formId: number;
    searchQuery?: string;
    assessmentType?: AssessmentType;
    page: number;
    pageSize: number;

    constructor(props: QueryFormsToCompareReqProps) {
        this.formId = props.formId;
        this.searchQuery = props.searchQuery;
        this.assessmentType = props.assessmentType;
        this.page = props.page;
        this.pageSize = props.pageSize;
    }

    toJson(): JSONParams {
        return {
            formId: this.formId,
            searchQuery: this.searchQuery,
            assessmentType: this.assessmentType,
            page: this.page,
            pageSize: this.pageSize
        }
    }
}