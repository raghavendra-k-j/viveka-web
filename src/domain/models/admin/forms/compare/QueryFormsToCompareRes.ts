import { JSONParams } from "@/core/types/JSONParams";
import { PageInfo } from "@/domain/models/commons/pagination/PageInfo";
import { FormCompareItem } from "./FormCompareItem";


type QueryFormsToCompareResProps = {
    items: FormCompareItem[];
    pageInfo: PageInfo;
}


class QueryFormsToCompareRes {
    items: FormCompareItem[];
    pageInfo: PageInfo;

    constructor(props: QueryFormsToCompareResProps) {
        this.items = props.items;
        this.pageInfo = props.pageInfo;
    }

    static fromJson(json: JSONParams): QueryFormsToCompareRes {
        const now = new Date();
        return new QueryFormsToCompareRes({
            items: json.items.map((item: JSONParams) => {
                return FormCompareItem.fromJson({ json: item, now: now });
            }),
            pageInfo: PageInfo.fromJson(json.pageInfo)
        });
    }
}



export { QueryFormsToCompareRes };