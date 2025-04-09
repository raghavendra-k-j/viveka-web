import { JSONParams } from "@/core/types/JSONParams";

type PageInfoProps = {
    pageSize: number;
    page: number;
    totalItems: number;
    totalPages: number;
}

export class PageInfo {
    pageSize: number;
    page: number;
    totalItems: number;
    totalPages: number;

    constructor(props: PageInfoProps) {
        this.pageSize = props.pageSize;
        this.page = props.page;
        this.totalItems = props.totalItems;
        this.totalPages = props.totalPages;
    }

    static fromJson(json: JSONParams): PageInfo {
        return new PageInfo({
            pageSize: json.pageSize,
            page: json.page,
            totalItems: json.totalItems,
            totalPages: json.totalPages
        });
    }

}
