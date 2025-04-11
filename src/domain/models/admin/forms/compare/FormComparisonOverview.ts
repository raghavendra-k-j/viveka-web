import { JSONParams } from "@/core/types/JSONParams";
import { NumberCompareUtil } from "@/domain/utils/NumberCompareUtil";


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
    avgMarksDiff: number;
    avgMarksPercentageChange: number;

    formAAvgTime: number;
    formBAvgTime: number;
    avgTimeDiff: number;
    avgTimePercentageChange: number;

    formAPassRate: number | null;
    formBPassRate: number | null;
    passRateDiff: number | null;
    passRatePercentageChange: number | null;

    formATotalResponses: number;
    formBTotalResponses: number;
    commonResponseCount: number;

    constructor(props: FormComparisonOverviewResProps) {
        this.formALabel = props.formALabel;
        this.formBLabel = props.formBLabel;

        this.formAAvgMarks = props.formAAvgMarks;
        this.formBAvgMarks = props.formBAvgMarks;
        const avgMarkCompareResult = NumberCompareUtil.compare(this.formAAvgMarks, this.formBAvgMarks);
        this.avgMarksDiff = avgMarkCompareResult.difference;
        this.avgMarksPercentageChange = avgMarkCompareResult.percentageChange ?? 0;

        this.formAAvgTime = props.formAAvgTime;
        this.formBAvgTime = props.formBAvgTime;
        const avgTimeCompareResult = NumberCompareUtil.compare(this.formAAvgTime, this.formBAvgTime);
        this.avgTimeDiff = avgTimeCompareResult.difference;
        this.avgTimePercentageChange = avgTimeCompareResult.percentageChange ?? 0;

        this.formAPassRate = props.formAPassRate;
        this.formBPassRate = props.formBPassRate;
        const passRateCompareResult = NumberCompareUtil.compare(this.formAPassRate, this.formBPassRate);
        this.passRateDiff = passRateCompareResult.difference;
        this.passRatePercentageChange = passRateCompareResult.percentageChange ?? 0;

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



