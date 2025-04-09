'use client';

import { AppException } from "@/core/exceptions/AppException";
import AdminFormsRepo from "@/data/repo/admin/AdminFormsRepo";
import AdminApiClient from "@/data/sources/AdminApiClient";
import { AdminFormDetail } from "@/domain/models/admin/forms/AdminFormDetail";
import AdminFormService from "@/domain/services/admin/AdminFormsService";
import { DataState } from "@/ui/utils/datastate";
import { makeAutoObservable, observable, observe } from "mobx";


export class AdminFormLayoutStore {

    permalink: string;
    adminFormsService: AdminFormService = new AdminFormService({ adminFormsRepo: new AdminFormsRepo({ adminApiClient: AdminApiClient.getInstance() }) });
    formState = DataState.initial<AdminFormDetail>();

    constructor({ permalink }: { permalink: string }) {
        this.permalink = permalink;
        makeAutoObservable(this, {
            formState: observable,
        });
        this.loadFormDetail({ permalink });
    }

    get formDetail() : AdminFormDetail {
        return this.formState.data!;
    }


    async loadFormDetail({ permalink }: { permalink: string }) {
        try {
            this.formState = DataState.loading();
            let response = (await this.adminFormsService.getAdminFormDetailByPermalink(permalink)).getOrThrow();
            this.formState = DataState.success(response);
        }
        catch (error) {
            const e = AppException.fromAny(error);
            this.formState = DataState.error({ error: e });
        }
    }


    dispose() {

    }

}