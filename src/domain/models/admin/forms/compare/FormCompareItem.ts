import { JSONParams } from "@/core/types/JSONParams";
import { AssessmentType } from "@/domain/models/commons/forms/AssessmentType";
import { FormStatus } from "@/domain/models/commons/forms/FormStatus";
import { FormType } from "@/domain/models/commons/forms/FormType";
import { AdminFormStatus } from "../AdminFormStatus";
import { Logger } from "@/core/utils/logger";

type FormCompareItemProps = {
    id: number;
    type: FormType;
    permalink: string;
    status: FormStatus;
    adminFormStatus: AdminFormStatus;
    title: string;
    createdAt: Date;
    startDate?: Date;
    endDate?: Date;
    assessmentType?: AssessmentType;
    totalQuestions: number;
    totalMarks: number;
    totalResponses: number;
}

export class FormCompareItem {
    id: number;
    type: FormType;
    status: FormStatus;
    adminFormStatus: AdminFormStatus;
    permalink: string;
    title: string;
    createdAt: Date;
    startDate?: Date;
    endDate?: Date;
    assessmentType?: AssessmentType;
    totalQuestions: number;
    totalMarks: number;
    totalResponses: number;

    constructor(params: FormCompareItemProps) {
        this.id = params.id;
        this.type = params.type;
        this.status = params.status;
        this.adminFormStatus = params.adminFormStatus;
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

    static fromJson({ json, now }: { json: JSONParams, now: Date }): FormCompareItem {
        const status = FormStatus.fromStatus(json.status)!;
        const startDate = json.startDate ? new Date(json.startDate) : undefined;
        const endDate = json.endDate ? new Date(json.endDate) : undefined;
        const adminFormStatus = AdminFormStatus.fromDbStatus({
            dbStatus: status,
            now: now,
            startDate: startDate,
            endDate: endDate
        });
        return new FormCompareItem({
            id: json.id,
            type: FormType.fromType(json.type)!,
            status: status,
            adminFormStatus: adminFormStatus,
            permalink: json.permalink,
            title: json.title,
            createdAt: new Date(json.createdAt),
            startDate: startDate,
            endDate: endDate,
            assessmentType: AssessmentType.fromType(json.assessmentType) ?? undefined,
            totalQuestions: json.totalQuestions,
            totalMarks: json.totalMarks,
            totalResponses: json.totalResponses,
        });
    }

}
