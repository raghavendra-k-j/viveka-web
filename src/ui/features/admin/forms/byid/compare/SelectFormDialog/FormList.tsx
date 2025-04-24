import React from "react";
import { observer } from "mobx-react-lite";
import { Loader } from "@/ui/widgets/loaders/Loader";
import AppErrorView from "@/ui/widgets/error/AppErrorView";
import { useSelectFormDialogStore } from "./storeCtx";
import { NumberDisplayUtil } from "@/domain/utils/NumberDisplayUtil";
import { FilledButton } from "@/ui/widgets/buttons/FilledButton";
import { OutlinedButton } from "@/ui/widgets/buttons/OutlinedButton";
import { DateDisplayUtil } from "@/ui/utils/DateDisplayUtil";
import { FormCompareItemVm } from "../Models";
import { Pagination } from "@/app/theme/Pagination";
import { SelectFormDialogStore } from "./store";
import clsx from "clsx";




const CenteredContent = ({ children }: { children: React.ReactNode }) => (
    <div className="flex justify-center items-center flex-1">
        {children}
    </div>
);



const FormList = observer(() => {
    const store = useSelectFormDialogStore();
    const { loadState, data } = store;


    function renderContent(): React.ReactNode {
        if (loadState.isError) {
            const error = loadState.error!;
            return (
                <CenteredContent>
                    <AppErrorView
                        className="p-page"
                        message={error.message}
                        description={error.description}
                        actions={[
                            <FilledButton onClick={() => store.loadData()} >Retry</FilledButton>
                        ]}
                    />
                </CenteredContent>
            );
        }

        if (loadState.isSuccess) {
            return (
                <div className="flex flex-col flex-1 overflow-hidden">
                    <div className="flex-1 overflow-auto divide-y divide-default">
                        {data.items.map((item) => (
                            <FormItem
                                key={item.item.id}
                                form={item}
                                onClick={() => store.onFormSelected(item)}
                            />
                        ))}
                    </div>
                    {store.isPaginationRequired && (<div className="flex flex-row items-center justify-center px-4 py-3 bg-surface border-default border-t">
                        <ListPagination store={store} />
                    </div>)}
                </div>
            );
        }


        // return loader by default
        return (<CenteredContent>
            <Loader />
        </CenteredContent>);
    }

    return (
        <div className="flex flex-col flex-1 overflow-hidden bg-background radius-dialog-b">
            {renderContent()}
        </div>);
});

export default FormList;


type FormItemProps = {
    form: FormCompareItemVm;
    onClick: (form: FormCompareItemVm) => void;
};

// Map of status to badge styles
const statusBadgeClasses: Record<string, string> = {
    Draft: "bg-yellow-100 text-yellow-800",
    Published: "bg-blue-100 text-blue-800",
    Active: "bg-green-100 text-green-800",
    Closed: "bg-red-100 text-red-800",
    Archived: "bg-gray-100 text-gray-500"
};

const FormItem = observer(({ form, onClick }: FormItemProps) => {
    const status = form.item.adminFormStatus;

    return (
        <div
            className="cursor-pointer bg-surface px-4 py-3 space-x-2 flex flex-row items-center justify-between group"
            onClick={() => onClick(form)}
        >
            <div className="space-y-1">


                <div className="space-x-2">
                    <span className={`inline-block rounded-sm px-2 py-1 text-xs font-medium ${statusBadgeClasses[status.name]}`}>
                        {status.name}
                    </span>
                    {form.item.assessmentType && (
                        <span className="inline-flex bg-primary-subtle text-primary font-medium px-2 py-1 rounded-sm fs-sm-p">
                            {form.item.assessmentType.name}
                        </span>
                    )}
                </div>

                <p className={clsx("fs-md font-medium text-app-primary group-hover:!text-primary", { "text-content-disabled": form.item.adminFormStatus.isDraft })}>
                    {form.item.title}
                </p>

                <div className="text-content-secondary fs-sm-p space-y-1">
                    <div>
                        {form.item.totalQuestions} Questions •{" "}
                        {NumberDisplayUtil.formatDecimal({ number: form.item.totalMarks, roundTo: 2 })} Marks •{" "}
                        {form.item.totalResponses} Responses
                    </div>
                    <div>
                        Start Date: {form.item.startDate ? DateDisplayUtil.dateTime(form.item.startDate) : "N/A"}
                    </div>
                    <div>
                        End Date: {form.item.endDate ? DateDisplayUtil.dateTime(form.item.endDate) : "N/A"}
                    </div>
                </div>
            </div>

            <OutlinedButton
                size="xs"
                onClick={() => onClick(form)}
                disabled={form.item.adminFormStatus.isDraft}
                loading={form.detailState.isLoading}
            >
                Select
            </OutlinedButton>
        </div>
    );
});




const ListPagination = observer(({ store }: { store: SelectFormDialogStore }) => {
    const { pageInfo } = store.data;
    const { page, totalPages } = pageInfo;

    return (
        <Pagination
            currentPage={page}
            totalPages={totalPages}
            onNext={() => store.goToPage(page + 1)}
            onPrev={() => store.goToPage(page - 1)}
            onFirst={() => store.goToPage(1)}
            onLast={() => store.goToPage(totalPages)}
        />
    );
});
