import { DialogCard, DialogFooter, DialogHeader } from "@/ui/widgets/dialogs/DialogCard";
import { makeAutoObservable, observable, reaction, runInAction } from "mobx";
import { createContext, useContext, useRef, useEffect } from "react";
import { useAdminFormCompareStore } from "./storeContext";
import { AdminFormCompareStore } from "./controller";
import { DataState } from "@/ui/utils/datastate";
import { QueryFormsToCompareReq, QueryFormsToCompareRes } from "@/domain/models/admin/forms/compare/QueryFormsToCompareModel";
import { AppException } from "@/core/exceptions/AppException";
import AppErrorView from "@/ui/widgets/error/AppErrorView";
import Loader from "@/ui/widgets/loaders/Loader";
import { observer } from "mobx-react-lite";
import debounce from "lodash/debounce";
import { StringUtils } from "@/core/utils/StringUtils";
import { CompareFormItem } from "@/domain/models/admin/forms/compare/CompareFormItem";

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
        reaction(() => this.searchQuery, this.debouncedLoadData)
        this.loadData();
    }

    onSearchQueryChange(value: string): void {
        runInAction(() => this.searchQuery = StringUtils.trimToEmpty(this.searchQuery));
    }

    async loadData() {
        this.loadState = DataState.loading();
        const req = new QueryFormsToCompareReq({
            searchQuery: StringUtils.trimToUndefined(this.searchQuery),
            formId: this.formDetail.id,
            page: 1,
            pageSize: 10
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

const SelectAssessmentDialogStore = createContext<SelectAssessmentDialogController | null>(null);

export function SelectAssessmentDialogStoreProvider({ children }: { children: React.ReactNode }) {
    const store = useRef<SelectAssessmentDialogController | null>(null);
    const parentStore = useAdminFormCompareStore();

    if (!store.current) {
        store.current = new SelectAssessmentDialogController({ parentStore: parentStore });
    }

    return (
        <SelectAssessmentDialogStore.Provider value={store.current}>
            {children}
        </SelectAssessmentDialogStore.Provider>
    );
}

export function useSelectAssessmentDialogStore() {
    const store = useContext(SelectAssessmentDialogStore);
    if (!store) {
        throw new Error("SelectAssessmentDialogStore must be used within a SelectAssessmentDialogStoreProvider");
    }
    return store;
}

// ---------------- UI Component ----------------

export default function SelectAssessmentDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    return (
        <SelectAssessmentDialogStoreProvider>
            <DialogCard isOpen={isOpen} onClose={onClose}>
                <div className="flex flex-col h-full max-h-[90vh]">
                    <DialogHeader onClose={onClose}>Select Assessment</DialogHeader>

                    <SearchBar />

                    <div className="flex-1 overflow-y-auto">
                        <ListOfAssessments />
                    </div>

                    <DialogFooter>
                        <button className="btn-primary" onClick={onClose}>Done</button>
                    </DialogFooter>
                </div>
            </DialogCard>
        </SelectAssessmentDialogStoreProvider>
    );
}

// ---------------- Search Bar ----------------

function SearchBar() {
    const store = useSelectAssessmentDialogStore();
    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Search for an assessment..."
                className="w-full p-2 border rounded"
                onChange={(e) => store.onSearchQueryChange(e.target.value)}
            />
        </div>
    );
}

// ---------------- List View ----------------
const ListOfAssessments = observer(() => {
    const { loadState, data, parentStore } = useSelectAssessmentDialogStore();

    if (loadState.isError) {
        const error = loadState.error!;
        return (
            <AppErrorView
                message={error.message}
                description={error.description}
                actions={[]}
            />
        );
    }

    if (loadState.isLoading) {
        return <Loader />;
    }

    if (loadState.isSuccess) {
        return (
            <div className="p-4 space-y-2">
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


type AssessmentItemProps = {
    form: CompareFormItem;
    onClick: (form: CompareFormItem) => void;
};


// ---------------- Assessment Item ----------------
const AssessmentItem: React.FC<AssessmentItemProps> = ({ form, onClick }) => {
    return (
        <div
            onClick={() => onClick(form)}
            className="p-4 border rounded shadow hover:shadow-md transition cursor-pointer"
        >
            <p className="font-semibold text-lg">{form.title}</p>
            <p className="text-sm text-gray-600">
                {form.totalResponses} responses • {form.totalQuestions} questions • {form.totalMarks} marks
            </p>
        </div>
    );
};