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
