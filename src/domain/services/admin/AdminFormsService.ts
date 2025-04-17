import { AppException } from "@/core/exceptions/AppException";
import { ResEither } from "@/core/utils/ResEither";
import AdminFormsRepo from "@/data/repo/admin/AdminFormsRepo";
import { AdminFormDetail } from "@/domain/models/admin/forms/AdminFormDetail";
import { ComparisonRecommendations } from "@/domain/models/admin/forms/compare/ComparisonRecommendations";
import { FormCompareDetails } from "@/domain/models/admin/forms/compare/FormCompareDetails";
import { FormCompareUserList } from "@/domain/models/admin/forms/compare/FormCompareUserList";
import { FormCompareUserListReq } from "@/domain/models/admin/forms/compare/FormCompareUserListReq";
import { FormComparisonOverview } from "@/domain/models/admin/forms/compare/FormComparisonOverview";
import { FormComparisonOverviewReq } from "@/domain/models/admin/forms/compare/FormComparisonOverviewReq";
import { QueryFormsToCompareReq } from "@/domain/models/admin/forms/compare/QueryFormsToCompareReq";
import { QueryFormsToCompareRes } from "@/domain/models/admin/forms/compare/QueryFormsToCompareRes";


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

    async queryComparisonRecommendations(formId: number): Promise<ResEither<AppException, ComparisonRecommendations>> {
        return await this.adminFormsRepo.queryComparisonRecommendations(formId);
    }

    async queryFormsToCompare(req: QueryFormsToCompareReq): Promise<ResEither<AppException, QueryFormsToCompareRes>> {
        return await this.adminFormsRepo.queryFormsToCompare(req);
    }

    async getFormCompareDetails(formAId: number, formBId: number): Promise<ResEither<AppException, FormCompareDetails>> {
        return await this.adminFormsRepo.getFormCompareDetails(formAId, formBId);
    }

    async getComparisonOverview(req: FormComparisonOverviewReq): Promise<ResEither<AppException, FormComparisonOverview>> {
        return await this.adminFormsRepo.getComparisonOverview(req);
    }

    async getComparisonUserList(req: FormCompareUserListReq): Promise<ResEither<AppException, FormCompareUserList>> {
        return await this.adminFormsRepo.getComparisonUserList(req);
    }
}

export default AdminFormService;
export type { AdminFormServiceParams };
