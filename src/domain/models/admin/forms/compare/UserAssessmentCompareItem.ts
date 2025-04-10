
import { GuestBase } from "@/domain/models/commons/user/GuestBase";
import { UserBase } from "@/domain/models/commons/user/UserBase";

type UserAssessmentCompareItemProps = {
    userTile?: UserBase;
    guestTile?: GuestBase;

    formAMarks: number;
    formBMarks: number;

    formAPercentage: number;
    formBPercentage: number;

    formATimeTaken: number;
    formBTimeTaken: number;

    formAPassed?: boolean;
    formBPassed?: boolean;
}


export class UserAssessmentCompareItem {
    userTile?: UserBase;
    guestTile?: GuestBase;

    formAMarks: number;
    formBMarks: number;

    formAPercentage: number;
    formBPercentage: number;

    formATimeTaken: number;
    formBTimeTaken: number;

    formAPassed?: boolean;
    formBPassed?: boolean;


    constructor(props: UserAssessmentCompareItemProps) {
        this.userTile = props.userTile;
        this.guestTile = props.guestTile;

        this.formAMarks = props.formAMarks;
        this.formBMarks = props.formBMarks;

        this.formAPercentage = props.formAPercentage;
        this.formBPercentage = props.formBPercentage;

        this.formATimeTaken = props.formATimeTaken;
        this.formBTimeTaken = props.formBTimeTaken;

        this.formAPassed = props.formAPassed;
        this.formBPassed = props.formBPassed;
    }

    static fromJson(json: any): UserAssessmentCompareItem {
        return new UserAssessmentCompareItem({
            userTile: json.userTile ? UserBase.fromJson(json.userTile) : undefined,
            guestTile: json.guestTile ? GuestBase.fromJson(json.guestTile) : undefined,

            formAMarks: json.formAMarks,
            formBMarks: json.formBMarks,

            formAPercentage: json.formAPercentage,
            formBPercentage: json.formBPercentage,

            formATimeTaken: json.formATimeTaken,
            formBTimeTaken: json.formBTimeTaken,

            formAPassed: json.formAPassed,
            formBPassed: json.formBPassed
        });
    }


}
