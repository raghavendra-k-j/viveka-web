import { JSONParams } from "@/core/types/JSONParams";
import { FormCompareDetail } from "./FormCompareDetail";

export class FormCompareDetails {
    formA: FormCompareDetail;
    formB: FormCompareDetail;
    commonResponsesCount: number;

    constructor(params: FormCompareDetails) {
        this.formA = params.formA;
        this.formB = params.formB;
        this.commonResponsesCount = params.commonResponsesCount;
    }

    static fromJson(json: JSONParams): FormCompareDetails {
        return new FormCompareDetails({
            formA: FormCompareDetail.fromJson(json.formA),
            formB: FormCompareDetail.fromJson(json.formB),
            commonResponsesCount: json.commonResponsesCount,
        });
    }
}
