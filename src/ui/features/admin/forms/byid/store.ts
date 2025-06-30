'use client';

import { AppException } from "@/core/exceptions/AppException";
import AdminFormsRepo from "@/data/repo/admin/AdminFormsRepo";
import AdminApiClient from "@/data/sources/AdminApiClient";
import { AdminFormDetail } from "@/domain/models/admin/forms/AdminFormDetail";
import AdminFormService from "@/domain/services/admin/AdminFormsService";
import { DataState } from "@/ui/utils/datastate";
import { withMinimumDelay } from "@/ui/utils/withMinimumDelay";
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
        console.log("Loading form detail for permalink:", this.permalink);
        try {
            runInAction(() => this.formState = DataState.loading());
            const response = await withMinimumDelay(this.adminFormsService.getAdminFormDetailByPermalink(this.permalink));
            const data = response.getOrThrow();
            runInAction(() => this.formState = DataState.success(data));
            console.log("Form detail loaded successfully:", data);
        }
        catch (error) {
            console.error("Error loading form detail:", error);
            const e = AppException.fromAny(error);
            runInAction(() => this.formState = DataState.error({ error: e }));
        }
    }


    dispose() {

    }

}