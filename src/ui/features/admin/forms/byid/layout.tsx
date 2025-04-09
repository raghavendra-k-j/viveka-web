import { useAdminFormLayoutStore } from "./storeContext";
import { observer } from "mobx-react-lite";
import AppErrorView from "@/ui/widgets/error/AppErrorView";
import Loader from "@/ui/widgets/loaders/Loader";


export type AdminFormLayoutParams = {
    permalink: string;
}


function AdminFormLayout({ children, layoutParams }: { children: React.ReactNode, layoutParams: AdminFormLayoutParams }) {
    const formState = useAdminFormLayoutStore().formState;

    if (formState.isError) {
        const e = formState.error!;
        return <Centered><AppErrorView message={e.message} description={e.description} actions={[]} /></Centered>;
    }

    if (formState.isSuccess) {
        return <>
            <AdminFormHeader />
            {children}
        </>;
    }

    return (
        <Centered>
            <Loader />
        </Centered>
    );
}


export default observer(AdminFormLayout);

function AdminFormHeader() {
    return (<></>);
}

function Centered({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col h-screen w-screen justify-center items-center">{children}</div>;
}