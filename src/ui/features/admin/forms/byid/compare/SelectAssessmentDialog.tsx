import { useState, useRef, useContext, createContext } from "react";
import { observer } from "mobx-react-lite";
import { makeAutoObservable, observable, reaction, runInAction } from "mobx";
import debounce from "lodash/debounce";

import { useAdminFormCompareStore } from "./storeContext";
import { AdminFormCompareStore } from "./controller";
import { DataState } from "@/ui/utils/datastate";
import { QueryFormsToCompareReq, QueryFormsToCompareRes } from "@/domain/models/admin/forms/compare/QueryFormsToCompareModel";
import { CompareFormItem } from "@/domain/models/admin/forms/compare/CompareFormItem";
import { AppException } from "@/core/exceptions/AppException";
import { StringUtils } from "@/core/utils/StringUtils";

import { DialogCard, DialogFooter, DialogHeader } from "@/ui/widgets/dialogs/DialogCard";
import AppErrorView from "@/ui/widgets/error/AppErrorView";
import { Loader } from "@/ui/widgets/loaders/Loader";

// ---------------- Store ----------------

class SelectAssessmentDialogController {
    parentStore: AdminFormCompareStore;
    loadState = DataState.initial<QueryFormsToCompareRes>();
    searchQuery: string = "";
    private debouncedLoadData: () => void;

    get formDetail() {
        return this.parentStore.formDetail;
    }

    get data() {
        return this.loadState.data!;
    }

    get adminFormsService() {
        return this.parentStore.parentStore.adminFormsService;
    }

    constructor(params: { parentStore: AdminFormCompareStore }) {
        this.parentStore = params.parentStore;
        makeAutoObservable(this, {
            loadState: observable,
            searchQuery: observable,
        });

        this.debouncedLoadData = debounce(() => this.loadData(), 300);
        reaction(() => this.searchQuery, this.debouncedLoadData);

        this.loadData();
    }

    onSearchQueryChange(value: string): void {
        runInAction(() => {
            this.searchQuery = StringUtils.trimToEmpty(value);
        });
    }

    async loadData() {
        this.loadState = DataState.loading();

        const req = new QueryFormsToCompareReq({
            searchQuery: StringUtils.trimToUndefined(this.searchQuery),
            formId: this.formDetail.id,
            page: 1,
            pageSize: 10,
        });

        try {
            const data = (await this.adminFormsService.getFormsToCompare(req)).getOrThrow();
            this.loadState = DataState.success(data);
        } catch (error) {
            const e = AppException.fromAny(error);
            this.loadState = DataState.error({ error: e });
        }
    }
}

const DialogStoreContext = createContext<SelectAssessmentDialogController | null>(null);

function DialogStoreProvider({ children }: { children: React.ReactNode }) {
    const store = useRef<SelectAssessmentDialogController | null>(null);
    const parentStore = useAdminFormCompareStore();

    if (!store.current) {
        store.current = new SelectAssessmentDialogController({ parentStore });
    }

    return (
        <DialogStoreContext.Provider value={store.current}>
            {children}
        </DialogStoreContext.Provider>
    );
}

function useDialogStore() {
    const store = useContext(DialogStoreContext);
    if (!store) throw new Error("Must be used within DialogStoreProvider");
    return store;
}

// ---------------- Main Dialog Component ----------------

export default function SelectAssessmentDialog({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    return (
        <DialogStoreProvider>
            <DialogCard isOpen={isOpen} onClose={onClose}>
                <div className="dialog-container">
                    <DialogHeader onClose={onClose}>Select Assessment</DialogHeader>
                    <SearchBar />
                    <AssessmentList />
                    <DialogFooter>
                        <button className="btn-primary" onClick={onClose}>Done</button>
                    </DialogFooter>
                </div>
            </DialogCard>
        </DialogStoreProvider>
    );
}

// ---------------- Search Bar ----------------

function SearchBar() {
    const store = useDialogStore();
    return (
        <div className="dialog-search">
            <input
                type="text"
                placeholder="Search for an assessment..."
                className="input"
                onChange={(e) => store.onSearchQueryChange(e.target.value)}
            />
        </div>
    );
}

// ---------------- List View ----------------

const AssessmentList = observer(() => {
    const { loadState, data, parentStore } = useDialogStore();

    if (loadState.isError) {
        const error = loadState.error!;
        return <AppErrorView message={error.message} description={error.description} actions={[]} />;
    }

    if (loadState.isLoading) {
        return <Loader />;
    }

    if (loadState.isSuccess) {
        return (
            <div className="assessment-list">
                {data.items.map((item) => (
                    <AssessmentItem
                        key={item.id}
                        form={item}
                        onClick={() => parentStore.onFormSelected(item)}
                    />
                ))}
            </div>
        );
    }

    return null;
});

// ---------------- Item Card ----------------

type AssessmentItemProps = {
    form: CompareFormItem;
    onClick: (form: CompareFormItem) => void;
};

function AssessmentItem({ form, onClick }: AssessmentItemProps) {
    return (
        <div className="assessment-item" onClick={() => onClick(form)}>
            <p className="assessment-title">{form.title}</p>
            <p className="assessment-meta">
                {form.totalResponses} responses • {form.totalQuestions} questions • {form.totalMarks} marks
            </p>
        </div>
    );
}
