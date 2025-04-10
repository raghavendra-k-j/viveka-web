import { JSONParams } from "@/core/types/JSONParams";


type FormComparisonOverviewReqProps = {
    formAId: number;
    formBId: number;
    formALabel: string;
    formBLabel: string;
}

export class FormComparisonOverviewReq {
    formAId: number;
    formBId: number;
    formALabel: string;
    formBLabel: string;

    constructor(props: FormComparisonOverviewReqProps) {
        this.formAId = props.formAId;
        this.formBId = props.formBId;
        this.formALabel = props.formALabel;
        this.formBLabel = props.formBLabel;
    }

    toJson(): JSONParams {
        return {
            formAId: this.formAId,
            formBId: this.formBId,
            formALabel: this.formALabel,
            formBLabel: this.formBLabel
        }
    }
}


type FormComparisonOverviewResProps = {
    formALabel: string;
    formBLabel: string;

    formAAvgMarks: number;
    formBAvgMarks: number;

    formAAvgTime: number;
    formBAvgTime: number;

    formAPassRate: number;
    formBPassRate: number;

    formATotalResponses: number;
    formBTotalResponses: number;
    commonResponseCount: number;
}

export class FormComparisonOverviewRes {
    formALabel: string;
    formBLabel: string;

    formAAvgMarks: number;
    formBAvgMarks: number;

    formAAvgTime: number;
    formBAvgTime: number;

    formAPassRate: number;
    formBPassRate: number;

    formATotalResponses: number;
    formBTotalResponses: number;
    commonResponseCount: number;


    constructor(props: FormComparisonOverviewResProps) {
        this.formALabel = props.formALabel;
        this.formBLabel = props.formBLabel;

        this.formAAvgMarks = props.formAAvgMarks;
        this.formBAvgMarks = props.formBAvgMarks;

        this.formAAvgTime = props.formAAvgTime;
        this.formBAvgTime = props.formBAvgTime;

        this.formAPassRate = props.formAPassRate;
        this.formBPassRate = props.formBPassRate;

        this.formATotalResponses = props.formATotalResponses;
        this.formBTotalResponses = props.formBTotalResponses;
        this.commonResponseCount = props.commonResponseCount;
    }

    static fromJson(json: JSONParams): FormComparisonOverviewRes {
        return new FormComparisonOverviewRes({
            formALabel: json.formALabel,
            formBLabel: json.formBLabel,
            formAAvgMarks: json.formAAvgMarks,
            formBAvgMarks: json.formBAvgMarks,
            formAAvgTime: json.formAAvgTime,
            formBAvgTime: json.formBAvgTime,
            formAPassRate: json.formAPassRate,
            formBPassRate: json.formBPassRate,
            formATotalResponses: json.formATotalResponses,
            formBTotalResponses: json.formBTotalResponses,
            commonResponseCount: json.commonResponseCount
        });
    }

}
