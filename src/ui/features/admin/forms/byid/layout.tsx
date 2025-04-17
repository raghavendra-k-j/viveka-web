import { useAdminFormStore } from "./storeCtx";
import { observer } from "mobx-react-lite";
import AppErrorView from "@/ui/widgets/error/AppErrorView";
import { Loader } from "@/ui/widgets/loaders/Loader";
import { FilledButton } from "@/ui/widgets/buttons/FilledButton";
import { ReactNode, useEffect } from "react";
import { ApiException } from "@/domain/exceptions/ApiException";
import clsx from "clsx";

export type AdminFormLayoutParams = {
    permalink: string;
};

type AdminFormLayoutProps = {
    children: React.ReactNode;
    layoutParams: AdminFormLayoutParams;
};

const AdminFormLayout = observer(({ children, layoutParams }: AdminFormLayoutProps) => {
    const store = useAdminFormStore();
    const { formState } = store;

    useEffect(() => {
        store.loadFormDetail();
    }, [store, layoutParams.permalink]);

    if (formState.isError) {
        const error = formState.error!;
    
        const actions: ReactNode[] = [
            <FilledButton key="retry" onClick={() => store.loadFormDetail()}>
                Retry
            </FilledButton>
        ];
    
        return (
            <AppErrorView
                className="p-page w-screen h-screen"
                message={error.message}
                description={error.description}
                actions={actions}
            />
        );
    }
    


    if (formState.isSuccess) {
        return (
            <>
                <AdminFormHeader />
                {children}
            </>
        );
    }

    return (
        <Centered>
            <Loader />
        </Centered>
    );
});

export default AdminFormLayout;

function AdminFormHeader() {
    return (
        <div />
    );
}

function Centered({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={clsx("flex flex-col w-screen h-screen justify-center items-center", props.className)}
            style={{ margin: 0 }}
            {...props}
        >
            {children}
        </div>
    );
}
