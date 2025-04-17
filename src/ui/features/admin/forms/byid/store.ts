'use client';

import { AppException } from "@/core/exceptions/AppException";
import AdminFormsRepo from "@/data/repo/admin/AdminFormsRepo";
import AdminApiClient from "@/data/sources/AdminApiClient";
import { AdminFormDetail } from "@/domain/models/admin/forms/AdminFormDetail";
import AdminFormService from "@/domain/services/admin/AdminFormsService";
import { DataState } from "@/ui/utils/datastate";
import { makeAutoObservable, observable, runInAction } from "mobx";

export class AdminFormStore {

    permalink: string;
    adminFormsService: AdminFormService = new AdminFormService({ adminFormsRepo: new AdminFormsRepo({ adminApiClient: AdminApiClient.getInstance() }) });
    formState = DataState.initial<AdminFormDetail>();

    constructor({ permalink }: { permalink: string }) {
        this.permalink = permalink;
        makeAutoObservable(this, {
            formState: observable,
        });
    }

    get formDetail(): AdminFormDetail {
        return this.formState.data!;
    }


    async loadFormDetail() {
        try {
            runInAction(() => this.formState = DataState.loading());
            let response = (await this.adminFormsService.getAdminFormDetailByPermalink(this.permalink)).getOrThrow();
            runInAction(() => this.formState = DataState.success(response));
        }
        catch (error) {
            const e = AppException.fromAny(error);
            runInAction(() => this.formState = DataState.error({ error: e }));
        }
    }


    dispose() {

    }

}