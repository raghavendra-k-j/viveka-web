
interface FormTypeParams {
    type: string;
    name: string;
    namePlural: string;
    shortName: string;
}

export class FormType {
    static assessment = new FormType({
        type: "Assessment",
        name: "Assessment",
        namePlural: "Assessments",
        shortName: "ASSMNT",
    });
    static survey = new FormType({
        type: "Survey",
        name: "Survey",
        namePlural: "Surveys",
        shortName: "Survey",
    });

    private constructor({
        type,
        name,
        namePlural,
        shortName,
    }: FormTypeParams) {
        this.type = type;
        this.name = name;
        this.namePlural = namePlural;
        this.shortName = shortName;
    }

    type: string;
    name: string;
    namePlural: string;
    shortName: string;

    // Getter methods
    get isAssessment(): boolean {
        return this === FormType.assessment;
    }

    get isSurvey(): boolean {
        return this === FormType.survey;
    }

    // Static method to create an instance from a type string
    static fromType(type: string | null): FormType | null {
        if (!type) return null;
        type = type.toLowerCase();
        if (FormType.assessment.type.toLowerCase() === type) {
            return FormType.assessment;
        } else if (FormType.survey.type.toLowerCase() === type) {
            return FormType.survey;
        }
        return null;
    }
}
