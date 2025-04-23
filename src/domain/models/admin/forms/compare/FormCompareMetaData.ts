import { JSONParams } from "@/core/types/JSONParams";
import { FormCompareItem } from "./FormCompareItem";

export class FormCompareMetaData {
    recommendedForm?: FormCompareItem;

    constructor(params: { recommendedForm?: FormCompareItem }) {
        this.recommendedForm = params.recommendedForm;
    }

    static fromJson(json: JSONParams): FormCompareMetaData {
        const recommendedForm = json.recommendedForm ? FormCompareItem.fromJson(json.recommendedForm) : undefined;
        return new FormCompareMetaData({ recommendedForm: recommendedForm });
    }
}
