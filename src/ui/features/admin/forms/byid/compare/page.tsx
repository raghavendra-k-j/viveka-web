"use client";

import { observer } from "mobx-react-lite";
import { useAdminFormCompareStore } from "./storeContext";
import AppErrorView from "@/ui/widgets/error/AppErrorView";
import { Loader } from "@/ui/widgets/loaders/Loader";
import { CompareTabFragment } from "./controller";
import CompareResultTab from "./CompareResult";
import SelectAssessmentTab from "./SelectAssessmentTab";



function AdminFormComparePage() {
    const store = useAdminFormCompareStore();
    const recommendationsState = store.recommendationsState;

    if (recommendationsState.isError) {
        const e = recommendationsState.error!;
        return <Centered><AppErrorView message={e.message} description={e.description} actions={[]} /></Centered>;
    }

    if (recommendationsState.isSuccess) {
        return <ObservedMainContent />;
    }

    return <Centered><Loader /></Centered>;
}

function Centered({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col h-screen w-screen justify-center items-center">{children}</div>;
}


function MainContent() {
    const store = useAdminFormCompareStore();

    if (store.currentFragment === CompareTabFragment.RESULT_PAGE) {
        return <CompareResultTab />;
    }
    else if (store.currentFragment === CompareTabFragment.SELECT_FORM) {
        return <SelectAssessmentTab />;
    }
    else {
        return <Centered><p>Unknown fragment: {store.currentFragment}</p></Centered>;
    }
}

const ObservedMainContent = observer(MainContent);



export default observer(AdminFormComparePage);
