import { AppException } from "@/core/exceptions/AppException";
import { ResEither } from "@/core/utils/ResEither";
import AdminFormsRepo from "@/data/repo/admin/AdminFormsRepo";
import { AdminFormDetail } from "@/domain/models/admin/forms/AdminFormDetail";
import { CompareRecommendationRes } from "@/domain/models/admin/forms/compare/CompareRecommendationRes";
import { QueryFormsToCompareReq, QueryFormsToCompareRes } from "@/domain/models/admin/forms/compare/QueryFormsToCompareModel";
import { FormComparisonOverviewReq, FormComparisonOverviewRes } from "@/domain/models/admin/forms/compare/FormComparisonOverview";
import { UserAssessmentCompareReq, UserAssessmentCompareRes } from "@/domain/models/admin/forms/compare/UserAssessmentCompareModel";

type AdminFormServiceParams = {
    adminFormsRepo: AdminFormsRepo;
};

class AdminFormService {
    private adminFormsRepo: AdminFormsRepo;

    constructor(params: AdminFormServiceParams) {
        this.adminFormsRepo = params.adminFormsRepo;
    }

    async getAdminFormDetailByPermalink(permalink: string): Promise<ResEither<AppException, AdminFormDetail>> {
        return await this.adminFormsRepo.getAdminFormDetailByPermalink(permalink);
    }

    async getRecommendedFormsToCompare(formId: number): Promise<ResEither<AppException, CompareRecommendationRes>> {
        return await this.adminFormsRepo.getRecommendedFormsToCompare(formId.toString());
    }

    async getFormsToCompare(req: QueryFormsToCompareReq): Promise<ResEither<AppException, QueryFormsToCompareRes>> {
        return await this.adminFormsRepo.queryFormsToCompare(req);
    }

    async getComparisonOverview(req: FormComparisonOverviewReq): Promise<ResEither<AppException, FormComparisonOverviewRes>> {
        return await this.adminFormsRepo.getComparisonOverview(req);
    }

    async getIndividualUsersComparison(req: UserAssessmentCompareReq): Promise<ResEither<AppException, UserAssessmentCompareRes>> {
        return await this.adminFormsRepo.getIndividualUsersComparison(req);
    }
}

export default AdminFormService;
export type { AdminFormServiceParams };
