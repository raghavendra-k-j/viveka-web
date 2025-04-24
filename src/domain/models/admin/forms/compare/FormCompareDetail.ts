import { JSONParams } from "@/core/types/JSONParams";
import { FormType } from "@/domain/models/commons/forms/FormType";
import { AdminFormStatus } from "../AdminFormStatus";
import { FormStatus } from "@/domain/models/commons/forms/FormStatus";


export class FormCompareDetail {

    id: number;
    type: FormType;
    permalink: string;
    status: FormStatus;
    adminFormStatus: AdminFormStatus;
    title: string;


    createdAt: Date;
    startDate?: Date;
    endDate?: Date;

    totalQuestions: number;
    totalMarks: number;
    passingMarks?: number;
    timeLimit?: number;

    totalResponses: number;

    constructor(params: FormCompareDetail) {
        this.id = params.id;
        this.type = params.type;
        this.permalink = params.permalink;
        this.status = params.status;
        this.adminFormStatus = params.adminFormStatus;
        this.title = params.title;
        this.createdAt = params.createdAt;
        this.startDate = params.startDate;
        this.endDate = params.endDate;
        this.totalQuestions = params.totalQuestions;
        this.totalMarks = params.totalMarks;
        this.passingMarks = params.passingMarks;
        this.timeLimit = params.timeLimit;
        this.totalResponses = params.totalResponses;
    }

    static fromJson({json, now}: {json: JSONParams, now: Date}): FormCompareDetail {
        const status = FormStatus.fromStatus(json.status)!;
        const startDate = json.startDate ? new Date(json.startDate) : undefined;
        const endDate = json.endDate ? new Date(json.endDate) : undefined;
        return new FormCompareDetail({
            id: json.id,
            type: FormType.fromType(json.type)!,
            permalink: json.permalink,
            status: status,
            adminFormStatus: AdminFormStatus.fromDbStatus({
                dbStatus: status,
                now: new Date(),
                startDate: startDate,
                endDate: endDate
            }),
            title: json.title,
            createdAt: new Date(json.createdAt),
            startDate: startDate,
            endDate: endDate,
            totalQuestions: json.totalQuestions,
            totalMarks: json.totalMarks,
            passingMarks: json.passingMarks,
            timeLimit: json.timeLimit,
            totalResponses: json.totalResponses
        });
    }


}