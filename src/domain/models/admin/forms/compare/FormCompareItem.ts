import { JSONParams } from "@/core/types/JSONParams";
import { AssessmentType } from "@/domain/models/commons/forms/AssessmentType";
import { FormType } from "@/domain/models/commons/forms/FormType";

type FormCompareItemProps = {
    id: number;
    type: FormType;
    permalink: string;
    title: string;
    createdAt: Date;
    startDate: Date;
    endDate: Date;
    assessmentType: AssessmentType;
    totalQuestions: number;
    totalMarks: number;
    totalResponses: number;
}

export class FormCompareItem {
    id: number;
    type: FormType;
    permalink: string;
    title: string;
    createdAt: Date;
    startDate: Date;
    endDate: Date;
    assessmentType: AssessmentType;
    totalQuestions: number;
    totalMarks: number;
    totalResponses: number;

    constructor(params: FormCompareItemProps) {
        this.id = params.id;
        this.type = params.type;
        this.permalink = params.permalink;
        this.title = params.title;
        this.createdAt = params.createdAt;
        this.startDate = params.startDate;
        this.endDate = params.endDate;
        this.assessmentType = params.assessmentType;
        this.totalQuestions = params.totalQuestions;
        this.totalMarks = params.totalMarks;
        this.totalResponses = params.totalResponses;
    }

    static fromJson(json: JSONParams): FormCompareItem {
        return new FormCompareItem({
            id: json.id,
            type: FormType.fromType(json.type)!,
            permalink: json.permalink,
            title: json.title,
            createdAt: new Date(json.createdAt),
            startDate: new Date(json.startDate),
            endDate: new Date(json.endDate),
            assessmentType: AssessmentType.fromType(json.assessmentType)!,
            totalQuestions: json.totalQuestions,
            totalMarks: json.totalMarks,
            totalResponses: json.totalResponses,
        });
    }

}
