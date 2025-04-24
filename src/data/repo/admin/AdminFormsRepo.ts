import { ResEither } from "@/core/utils/ResEither";
import AdminApiClient from "@/data/sources/AdminApiClient";
import { ApiException } from "@/domain/exceptions/ApiException";
import { AdminFormDetail } from "@/domain/models/admin/forms/AdminFormDetail";
import { FormCompareMetaData } from "@/domain/models/admin/forms/compare/FormCompareMetaData";
import { QueryFormsToCompareReq } from "@/domain/models/admin/forms/compare/QueryFormsToCompareReq";
import { QueryFormsToCompareRes } from "@/domain/models/admin/forms/compare/QueryFormsToCompareRes";
import { FormComparisonOverviewReq } from "@/domain/models/admin/forms/compare/FormComparisonOverviewReq";
import { FormCompareUserListReq } from "@/domain/models/admin/forms/compare/FormCompareUserListReq";
import { FormComparisonOverview } from "@/domain/models/admin/forms/compare/FormComparisonOverview";
import { FormCompareUserList } from "@/domain/models/admin/forms/compare/FormCompareUserList";
import { FormCompareDetails } from "@/domain/models/admin/forms/compare/FormCompareDetails";
import { Logger } from "@/core/utils/logger";
import { AppException } from "@/core/exceptions/AppException";

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
            const response = await this.adminApiClient.getAxios().post(`/api/v1/admin/forms/${req.formId}/compare/candidates`, req.toJson());
            const data = QueryFormsToCompareRes.fromJson(response.data);
            return ResEither.success(data);
        } catch (e) {
            const error = ApiException.fromApiError(e);
            return ResEither.failure(error);
        }
    }

    async queryComparisionMetaData(formId: number): Promise<ResEither<ApiException, FormCompareMetaData>> {
        try {
            const response = await this.adminApiClient.getAxios().get(`/api/v1/admin/forms/${formId}/compare/metadata`);
            const data = FormCompareMetaData.fromJson(response.data);
            return ResEither.success(data);
        } catch (e) {
            const error = ApiException.fromApiError(e);
            return ResEither.failure(error);
        }
    }

    async getFormCompareDetails(formAId: number, formBId: number): Promise<ResEither<ApiException, FormCompareDetails>> {
        try {
            const response = await this.adminApiClient.getAxios().get(`/api/v1/admin/forms/${formAId}/compare/${formBId}/details`);
            const data = FormCompareDetails.fromJson(response.data);
            return ResEither.success(data);
        } catch (e) {
            const error = ApiException.fromApiError(e);
            return ResEither.failure(error);
        }
    }


    async getComparisonOverview(req: FormComparisonOverviewReq): Promise<ResEither<ApiException, FormComparisonOverview>> {
        try {
            const response = await this.adminApiClient.getAxios().post(`/api/v1/admin/forms/${req.formAId}/compare/${req.formBId}/overview`, req.toJson());
            const data = FormComparisonOverview.fromJson(response.data);
            return ResEither.success(data);
        } catch (e) {
            const error = ApiException.fromApiError(e);
            return ResEither.failure(error);
        }
    }

    async getComparisonUserList(req: FormCompareUserListReq): Promise<ResEither<ApiException, FormCompareUserList>> {
        try {
            const response = await this.adminApiClient.getAxios().post(`/api/v1/admin/forms/${req.formAId}/compare/${req.formBId}/users`, req.toJson());
            const data = FormCompareUserList.fromJson(response.data);
            return ResEither.success(data);
        } catch (e) {
            const error = ApiException.fromApiError(e);
            return ResEither.failure(error);
        }
    }
}

export default AdminFormsRepo;
