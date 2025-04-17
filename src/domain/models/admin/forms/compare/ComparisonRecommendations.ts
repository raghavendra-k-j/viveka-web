import { JSONParams } from "@/core/types/JSONParams";
import { FormCompareItem } from "./FormCompareItem";

export class ComparisonRecommendations {
    recommendedForms: FormCompareItem[];

    constructor(params: { recommendedForms: FormCompareItem[] }) {
        this.recommendedForms = params.recommendedForms;
    }

    static fromJson(json: JSONParams): ComparisonRecommendations {
        const forms = (json.recommendedForms || []).map((item: JSONParams) => FormCompareItem.fromJson(item));
        return new ComparisonRecommendations({ recommendedForms: forms });
    }
}
