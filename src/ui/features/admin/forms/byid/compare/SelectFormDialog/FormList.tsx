import React from "react";
import { observer } from "mobx-react-lite";
import { Loader } from "@/ui/widgets/loaders/Loader";
import AppErrorView from "@/ui/widgets/error/AppErrorView";
import { useSelectFormDialogStore } from "./storeCtx";
import { FormCompareItem } from "@/domain/models/admin/forms/compare/FormCompareItem";
import { NumberDisplayUtil } from "@/domain/utils/NumberDisplayUtil";
import { DialogPagination } from "@/ui/widgets/dialogs/DialogPagination";

const FormList = observer(() => {
    const store = useSelectFormDialogStore();
    const { loadState, data, parentStore } = store;

    if (loadState.isError) {
        const error = loadState.error!;
        return (<CenteredContent>
            <AppErrorView
                message={error.message}
                description={error.description}
                actions={[]}
            />
        </CenteredContent>);
    }

    if (loadState.isLoading) {
        return (<CenteredContent>
            <Loader />
        </CenteredContent>);
    }

    if (loadState.isSuccess) {
        return (
            <div className="flex flex-col flex-1 overflow-hidden">
                <div className="flex-1 overflow-y-auto flex flex-col bg-background">
                    {data.items.map((item) => (
                        <FormItem
                            key={item.id}
                            form={item}
                            onClick={() => parentStore.onFormSelected(item)}
                        />
                    ))}
                </div>
                <DialogPagination
                    currentPage={store.currentPage}
                    totalPages={data.pageInfo.totalPages}
                    onPageChange={(page) => store.goToPage(page)}
                />
            </div>
        );
    }

    return null;
});

export default FormList;


type FormItemProps = {
    form: FormCompareItem;
    onClick: (form: FormCompareItem) => void;
};

const FormItem = ({ form, onClick }: FormItemProps) => (
    <div className="bg-surface border-b border-dialog-divider cursor-pointer p-3 group" onClick={() => onClick(form)}>
        <p className="fs-md font-medium text-app-primary group-hover:!text-primary">{form.title}</p>
        <p className="fs-md-m text-content-secondary">
            {form.totalQuestions} Questions • {NumberDisplayUtil.formatDecimal({ number: form.totalMarks, roundTo: 2 })} Marks • {form.totalResponses} Responses
        </p>
    </div>
);


const CenteredContent = ({ children }: { children: React.ReactNode }) => (
    <div className="flex justify-center items-center flex-1">
        {children}
    </div>
);


