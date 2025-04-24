import { JSONParams } from "@/core/types/JSONParams";
import { FormCompareItem } from "./FormCompareItem";
import { Logger } from "@/core/utils/logger";

export class FormCompareMetaData {
    recommendedForm?: FormCompareItem;

    constructor(params: { recommendedForm?: FormCompareItem }) {
        this.recommendedForm = params.recommendedForm;
    }

    static fromJson(json: JSONParams): FormCompareMetaData {
        const recommendedForm = json.recommendedForm ? FormCompareItem.fromJson({ json: json.recommendedForm, now: new Date() }) : undefined;
        return new FormCompareMetaData({ recommendedForm: recommendedForm });
    }
}
