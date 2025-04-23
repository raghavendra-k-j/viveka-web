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

const FormItem = observer(({ form, onClick }: FormItemProps) => {
    return (
        <div className="cursor-pointer bg-surface px-4 py-3 space-x-2 flex flex-row items-center justify-between" onClick={() => onClick(form)}>
            <div className="space-y-1">
                {form.item.assessmentType && (<div>
                    <span className="inline-flex bg-primary-subtle text-primary font-medium px-2 py-1 rounded-sm fs-sm-p">{form.item.assessmentType.name}</span>
                </div>)}
                <p className="fs-md font-medium text-app-primary group-hover:!text-primary">{form.item.title}</p>
                <div className="text-content-secondary fs-sm-p space-y-1">
                    <div>
                        {form.item.totalQuestions} Questions • {NumberDisplayUtil.formatDecimal({ number: form.item.totalMarks, roundTo: 2 })} Marks • {form.item.totalResponses} Responses
                    </div>
                    <div>
                        Start Date: {DateDisplayUtil.dateTime(form.item.startDate)}
                    </div>
                    <div>
                        End Date: {DateDisplayUtil.dateTime(form.item.endDate)}
                    </div>
                </div>
            </div>
            <OutlinedButton
                size="xs"
                onClick={() => onClick(form)}
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
