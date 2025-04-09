import { JSONParams } from "@/core/types/JSONParams";
import { AssessmentType } from "@/domain/models/commons/forms/AssessmentType";
import { CompareFormItem } from "./CompareFormItem";
import { PageInfo } from "@/domain/models/commons/pagination/pageinfo";


type QueryFormsToCompareReqProps = {
    formId: number;
    searchQuery?: string;
    assessmentType?: AssessmentType;
    page: number;
    pageSize: number;
}

class QueryFormsToCompareReq {
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


type QueryFormsToCompareResProps = {
    items: CompareFormItem[];
    pageInfo: PageInfo;
}


class QueryFormsToCompareRes {
    items: CompareFormItem[];
    pageInfo: PageInfo;

    constructor(props: QueryFormsToCompareResProps) {
        this.items = props.items;
        this.pageInfo = props.pageInfo;
    }

    static fromJson(json: JSONParams): QueryFormsToCompareRes {
        return new QueryFormsToCompareRes({
            items: json.items.map((item: JSONParams) => CompareFormItem.fromJson(item)),
            pageInfo: PageInfo.fromJson(json.pageInfo)
        });
    }
}



export { QueryFormsToCompareReq, QueryFormsToCompareRes };