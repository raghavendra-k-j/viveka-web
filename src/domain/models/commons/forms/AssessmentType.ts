type AssessmentTypeParams = {
    type: string;
    name: string;
}

export class AssessmentType {

    static preTraining = new AssessmentType({
        type: "Pre-Training",
        name: "Pre-Training",
    });

    static postTraining = new AssessmentType({
        type: "Post-Training",
        name: "Post-Training",
    });

    static values = [this.preTraining, this.postTraining];
    static valuesMap = {
        [this.preTraining.type]: this.preTraining,
        [this.postTraining.type]: this.postTraining,
    };

    type: string;
    name: string;

    constructor(params: AssessmentTypeParams) {
        this.type = params.type;
        this.name = params.name;
    }

    static fromType(type: string | null): AssessmentType | null {
        if (!type) return null;
        return this.valuesMap[type] || null;
    }

}

