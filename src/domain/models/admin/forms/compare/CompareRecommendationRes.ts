import { JSONParams } from "@/core/types/JSONParams";
import { CompareFormItem } from "./CompareFormItem";

export class CompareRecommendationRes {
    recommendedForms: CompareFormItem[];

    constructor(params: { recommendedForms: CompareFormItem[] }) {
        this.recommendedForms = params.recommendedForms;
    }

    static fromJson(json: JSONParams): CompareRecommendationRes {
        const forms = (json.recommendedForms || []).map((item: any) => CompareFormItem.fromJson(item));
        return new CompareRecommendationRes({ recommendedForms: forms });
    }
}
