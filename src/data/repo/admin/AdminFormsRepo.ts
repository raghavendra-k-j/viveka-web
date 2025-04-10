import { AppException } from "@/core/exceptions/AppException";
import { ResEither } from "@/core/utils/ResEither";
import AdminApiClient from "@/data/sources/AdminApiClient";
import { ApiException } from "@/domain/exceptions/ApiException";
import { AdminFormDetail } from "@/domain/models/admin/forms/AdminFormDetail";
import { CompareRecommendationRes } from "@/domain/models/admin/forms/compare/CompareRecommendationRes";
import { FormComparisonOverviewReq, FormComparisonOverviewRes } from "@/domain/models/admin/forms/compare/FormComparisonOverview";
import { QueryFormsToCompareReq, QueryFormsToCompareRes } from "@/domain/models/admin/forms/compare/QueryFormsToCompareModel";
import { UserAssessmentCompareReq, UserAssessmentCompareRes } from "@/domain/models/admin/forms/compare/UserAssessmentCompareModel";

type AdminFormsRepoParams = {
    adminApiClient: AdminApiClient;
};

class AdminFormsRepo {
    private adminApiClient: AdminApiClient;

    constructor(params: AdminFormsRepoParams) {
        this.adminApiClient = params.adminApiClient;
    }

    async getAdminFormDetailByPermalink(permalink: string): Promise<ResEither<ApiException, AdminFormDetail>> {
        try {
            const response = await this.adminApiClient.getAxios().get(`/api/v1/admin/forms/${permalink}`);
            const data = AdminFormDetail.fromJson(response.data);
            return ResEither.success(data);
        }
        catch (e) {
            const error = ApiException.fromApiError(e);
            return ResEither.failure(error);
        }
    }

    async queryFormsToCompare(req: QueryFormsToCompareReq): Promise<ResEither<ApiException, QueryFormsToCompareRes>> {
        try {
            const response = await this.adminApiClient.getAxios().post(`/api/v1/admin/forms/${req.formId}/compare/assessments/query`, req.toJson());
            const data = QueryFormsToCompareRes.fromJson(response.data);
            return ResEither.success(data);
        } catch (e) {
            const error = ApiException.fromApiError(e);
            return ResEither.failure(error);
        }
    }

    async getRecommendedFormsToCompare(formId: string): Promise<ResEither<ApiException, CompareRecommendationRes>> {
        try {
            const response = await this.adminApiClient.getAxios().get(`/api/v1/admin/forms/${formId}/compare/assessments/recommendations`);
            const data = CompareRecommendationRes.fromJson(response.data);
            return ResEither.success(data);
        } catch (e) {
            const error = ApiException.fromApiError(e);
            return ResEither.failure(error);
        }
    }

    async getComparisonOverview(req: FormComparisonOverviewReq): Promise<ResEither<ApiException, FormComparisonOverviewRes>> {
        try {
            const response = await this.adminApiClient.getAxios().post(`/api/v1/admin/forms/${req.formAId}/compare/overview`, req.toJson());
            const data = FormComparisonOverviewRes.fromJson(response.data);
            return ResEither.success(data);
        } catch (e) {
            const error = ApiException.fromApiError(e);
            return ResEither.failure(error);
        }
    }

    async getIndividualUsersComparison(req: UserAssessmentCompareReq): Promise<ResEither<ApiException, UserAssessmentCompareRes>> {
        try {
            const response = await this.adminApiClient.getAxios().post(`/api/v1/admin/forms/${req.formAId}/compare/users`, req.toJson());
            const data = UserAssessmentCompareRes.fromJson(response.data);
            return ResEither.success(data);
        } catch (e) {
            const error = ApiException.fromApiError(e);
            return ResEither.failure(error);
        }
    }



}

export default AdminFormsRepo;
