import { JSONParams } from "@/core/types/JSONParams";
import { FormType } from "@/domain/models/commons/forms/FormType";


export class FormCompareDetail {

    id: number;
    type: FormType;
    permalink: string;
    title: string;

    createdAt: Date;
    startDate: Date;
    endDate: Date;

    totalQuestions: number;
    totalMarks: number;
    passingMarks?: number;
    timeLimit?: number;

    totalResponses: number;

    constructor(params: FormCompareDetail) {
        this.id = params.id;
        this.type = params.type;
        this.permalink = params.permalink;
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

    static fromJson(json: JSONParams): FormCompareDetail {
        return new FormCompareDetail({
            id: json.id,
            type: FormType.fromType(json.type)!,
            permalink: json.permalink,
            title: json.title,
            createdAt: new Date(json.createdAt),
            startDate: new Date(json.startDate),
            endDate: new Date(json.endDate),
            totalQuestions: json.totalQuestions,
            totalMarks: json.totalMarks,
            passingMarks: json.passingMarks,
            timeLimit: json.timeLimit,
            totalResponses: json.totalResponses
        });
    }


}