import { JSONParams } from "@/core/types/JSONParams";
import { GuestBase } from "@/domain/models/commons/user/GuestBase";
import { UserBase } from "@/domain/models/commons/user/UserBase";

type FormCompareUserItemDetailProps = {
    marks: number;
    percentage: number;
    timeTaken: number;
    passed?: boolean;
}

export class FormCompareUserItemDetail {
    marks: number;
    percentage: number;
    timeTaken: number;
    passed?: boolean;

    constructor(props: FormCompareUserItemDetailProps) {
        this.marks = props.marks;
        this.percentage = props.percentage;
        this.timeTaken = props.timeTaken;
        this.passed = props.passed;
    }

    static fromJson(json: JSONParams): FormCompareUserItemDetail {
        return new FormCompareUserItemDetail({
            marks: json.marks,
            percentage: json.percentage,
            timeTaken: json.timeTaken,
            passed: json.passed
        });
    }
}


export type FormCompareUserItemProps = {
    userTile?: UserBase;
    guestTile?: GuestBase;

    formA: FormCompareUserItemDetail;
    formB: FormCompareUserItemDetail;
}

export class FormCompareUserItem {
    userTile?: UserBase;
    guestTile?: GuestBase;

    formA: FormCompareUserItemDetail;
    formB: FormCompareUserItemDetail;


    constructor(props: FormCompareUserItemProps) {
        this.userTile = props.userTile;
        this.guestTile = props.guestTile;

        this.formA = props.formA;
        this.formB = props.formB;
    }

    static fromJson(json: JSONParams): FormCompareUserItem {
        return new FormCompareUserItem({
            userTile: json.userTile ? UserBase.fromJson(json.userTile) : undefined,
            guestTile: json.guestTile ? GuestBase.fromJson(json.guestTile) : undefined,
            formA: FormCompareUserItemDetail.fromJson(json.formA),
            formB: FormCompareUserItemDetail.fromJson(json.formB)
        });
    }
}