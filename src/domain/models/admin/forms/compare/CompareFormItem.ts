import { JSONParams } from "@/core/types/JSONParams";
import { FormType } from "@/domain/models/commons/forms/FormType";

type CompareFormItemParams = {
    id: number;
    type: FormType;
    permalink: string;
    title: string;
    createdAt: Date;
    totalQuestions: number;
    totalMarks: number;
    totalResponses: number;
}

export class CompareFormItem {
    id: number;
    type: FormType;
    permalink: string;
    title: string;
    createdAt: Date;
    totalQuestions: number;
    totalMarks: number;
    totalResponses: number;

    constructor(params: CompareFormItemParams) {
        this.id = params.id;
        this.type = params.type;
        this.permalink = params.permalink;
        this.title = params.title;
        this.createdAt = params.createdAt;
        this.totalQuestions = params.totalQuestions;
        this.totalMarks = params.totalMarks;
        this.totalResponses = params.totalResponses;
    }

    static fromJson(json: JSONParams): CompareFormItem {
        return new CompareFormItem({
            id: json.id,
            type: FormType.fromType(json.type)!,
            permalink: json.permalink,
            title: json.title,
            createdAt: new Date(json.createdAt),
            totalQuestions: json.totalQuestions,
            totalMarks: json.totalMarks,
            totalResponses: json.totalResponses,
        });
    }
}
