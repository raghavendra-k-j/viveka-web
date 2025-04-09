import { AssessmentType } from "../../commons/forms/AssessmentType";
import { FormVisibility } from "../../commons/forms/FormVisibility";
import { FormUser } from "../../commons/forms/FormUser";
import { Language } from "../../commons/language/Language";
import { FormType } from "../../commons/forms/FormType";
import { FormStatus } from "../../commons/forms/FormStatus";

type AdminFormDetailParams = {
    orgId: number;
    id: number;
    type: FormType;
    permalink: string;
    shortLink: string;
    creator: FormUser;
    updatedBy: FormUser;
    createdAt: Date;
    updatedAt: Date;
    status: FormStatus;
    language: Language | null;
    languages: Language[] | null;
    verifyGuestEmail: boolean | null;
    title: string;
    description: string | null;
    tags: string[] | null;
    startDate: Date | null;
    endDate: Date | null;
    timeLimit: number | null;
    totalQuestions: number;
    totalMarks: number | null;
    passingMarks: number | null;
    assessmentType: AssessmentType | null;
    shuffle: boolean | null;
    visibility: FormVisibility;
    hold4ManualEval: boolean | null;
    evalOeQsWtAi: boolean | null;

    totalViews: number;
    totalInvites: number;
    totalResponses: number;
}


export class AdminFormDetail {
    orgId: number;
    id: number;
    type: FormType;
    permalink: string;
    shortLink: string;
    creator: FormUser;
    updatedBy: FormUser;
    createdAt: Date;
    updatedAt: Date;
    status: FormStatus;
    language: Language | null;
    languages: Language[] | null;
    verifyGuestEmail: boolean | null;
    title: string;
    description: string | null;
    tags: string[] | null;
    startDate: Date | null;
    endDate: Date | null;
    timeLimit: number | null;
    totalQuestions: number;
    totalMarks: number | null;
    passingMarks: number | null;
    assessmentType: AssessmentType | null;
    shuffle: boolean | null;
    visibility: FormVisibility;
    hold4ManualEval: boolean | null;
    evalOeQsWtAi: boolean | null;

    totalViews: number;
    totalInvites: number;
    totalResponses: number;


    constructor(params: AdminFormDetailParams) {
        this.orgId = params.orgId;
        this.id = params.id;
        this.type = params.type;
        this.permalink = params.permalink;
        this.shortLink = params.shortLink;
        this.creator = params.creator;
        this.updatedBy = params.updatedBy;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
        this.status = params.status;
        this.language = params.language;
        this.languages = params.languages;
        this.verifyGuestEmail = params.verifyGuestEmail;
        this.title = params.title;
        this.description = params.description;
        this.tags = params.tags;
        this.startDate = params.startDate;
        this.endDate = params.endDate;
        this.timeLimit = params.timeLimit;
        this.totalQuestions = params.totalQuestions;
        this.totalMarks = params.totalMarks;
        this.passingMarks = params.passingMarks;
        this.assessmentType = params.assessmentType;
        this.shuffle = params.shuffle;
        this.visibility = params.visibility;
        this.hold4ManualEval = params.hold4ManualEval;
        this.evalOeQsWtAi = params.evalOeQsWtAi;
        this.totalViews = params.totalViews;
        this.totalInvites = params.totalInvites;
        this.totalResponses = params.totalResponses;
    }


    static fromJson(json: any): AdminFormDetail {
        return new AdminFormDetail({
            orgId: json.orgId,
            id: json.id,
            type: FormType.fromType(json.type)!,
            shortLink: json.shortLink,
            permalink: json.permalink,
            creator: FormUser.fromJson(json.creator),
            updatedBy: FormUser.fromJson(json.updatedBy),
            createdAt: new Date(json.createdAt),
            updatedAt: new Date(json.updatedAt),
            status: FormStatus.fromStatus(json.status)!,
            language: json.language ? Language.fromMap(json.language) : null,
            languages: json.languages ? json.languages.map((lang: any) => Language.fromMap(lang)) : null,
            verifyGuestEmail: json.verifyGuestEmail,
            title: json.title,
            description: json.description,
            tags: json.tags ? json.tags : null,
            startDate: json.startDate ? new Date(json.startDate) : null,
            endDate: json.endDate ? new Date(json.endDate) : null,
            timeLimit: json.timeLimit,
            totalQuestions: json.totalQuestions,
            totalMarks: json.totalMarks,
            passingMarks: json.passingMarks,
            assessmentType: AssessmentType.fromType(json.assessmentType),
            shuffle: json.shuffle,
            visibility: FormVisibility.fromString(json.visibility)!,
            hold4ManualEval: json.hold4ManualEval,
            evalOeQsWtAi: json.evalOeQsWtAi,
            totalViews: json.totalViews,
            totalInvites: json.totalInvites,
            totalResponses: json.totalResponses,
        });
    }





}
