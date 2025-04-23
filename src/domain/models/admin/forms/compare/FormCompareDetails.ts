import { JSONParams } from "@/core/types/JSONParams";
import { FormCompareDetail } from "./FormCompareDetail";

export class FormCompareDetails {
    formA: FormCompareDetail;
    formB: FormCompareDetail;
    formALabel: string;
    formBLabel: string;
    commonResponsesCount: number;

    constructor(params: {
        formA: FormCompareDetail;
        formB: FormCompareDetail;
        formALabel: string;
        formBLabel: string;
        commonResponsesCount: number;
    }) {
        this.formA = params.formA;
        this.formB = params.formB;
        this.formALabel = params.formALabel;
        this.formBLabel = params.formBLabel;
        this.commonResponsesCount = params.commonResponsesCount;
    }

    static fromJson(json: JSONParams): FormCompareDetails {
        return new FormCompareDetails({
            formA: FormCompareDetail.fromJson(json.formA),
            formB: FormCompareDetail.fromJson(json.formB),
            formALabel: json.formALabel,
            formBLabel: json.formBLabel,
            commonResponsesCount: json.commonResponsesCount,
        });
    }
}
