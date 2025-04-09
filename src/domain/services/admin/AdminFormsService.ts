import { AppException } from "@/core/exceptions/AppException";
import { ResEither } from "@/core/utils/ResEither";
import AdminFormsRepo from "@/data/repo/admin/AdminFormsRepo";
import { AdminFormDetail } from "@/domain/models/admin/forms/AdminFormDetail";
import { CompareRecommendationRes } from "@/domain/models/admin/forms/compare/CompareRecommendationRes";
import { QueryFormsToCompareReq, QueryFormsToCompareRes } from "@/domain/models/admin/forms/compare/QueryFormsToCompareModel";

type AdminFormServiceParams = {
    adminFormsRepo: AdminFormsRepo;
}

class AdminFormService {

    private adminFormsRepo: AdminFormsRepo;

    constructor(params: AdminFormServiceParams) {
        this.adminFormsRepo = params.adminFormsRepo;
    }

    async getAdminFormDetailByPermalink(permalink: string): Promise<ResEither<AppException, AdminFormDetail>> {
        const response = await this.adminFormsRepo.getAdminFormDetailByPermalink(permalink);
        return response;
    }

    async getRecommendedFormsToCompare(formId: number): Promise<ResEither<AppException, CompareRecommendationRes>> {
        const response = await this.adminFormsRepo.getRecommendedFormsToCompare(formId);
        return response;
    }

    async getFormsToCompare(req: QueryFormsToCompareReq): Promise<ResEither<AppException, QueryFormsToCompareRes>> {
        const response = await this.adminFormsRepo.getFormsToCompare({ req });
        return response;
    }



}


export default AdminFormService;
export type { AdminFormServiceParams };