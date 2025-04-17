"use client";

import { observer } from "mobx-react-lite";
import { useAdminFormCompareStore } from "./storeCtx";
import AppErrorView from "@/ui/widgets/error/AppErrorView";
import { Loader } from "@/ui/widgets/loaders/Loader";
import { CompareTabFragment } from "./store";
import CompareResultTab from "./widgets/CompareResult";
import SelectFormTab from "./widgets/SelectFormTab";
import { useEffect } from "react";
import { FilledButton } from "@/ui/widgets/buttons/FilledButton";



function AdminFormComparePage() {
    const store = useAdminFormCompareStore();
    const recommendationsState = store.recommendationsState;

    useEffect(() => {
        if (store.recommendationsState.isInitial) {
            store.queryComparisonRecommendations();
        }
    }, [store]);


    if (recommendationsState.isError) {
        const e = recommendationsState.error!;
        return (<PageContainer>
            <CenteredContent>
                <AppErrorView
                    message={e.message}
                    description={e.description}
                    actions={[
                        <FilledButton key="retry" onClick={() => store.queryComparisonRecommendations()}>
                            Retry
                        </FilledButton>
                    ]}
                />

            </CenteredContent>
        </PageContainer>);
    }

    if (recommendationsState.isSuccess) {
        return (<PageContainer>
            <MainContent />
        </PageContainer>);
    }

    return (<CenteredContent>
        <Loader />
    </CenteredContent>);
}

function PageContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full max-w-6xl mx-auto">
            {children}
        </div>
    );
}

function CenteredContent({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col h-screen w-screen justify-center items-center">{children}</div>;
}


const MainContent = observer(() => {
    const store = useAdminFormCompareStore();

    if (store.currentFragment === CompareTabFragment.RESULT_PAGE) {
        return (<CompareResultTab />);
    }
    else if (store.currentFragment === CompareTabFragment.SELECT_FORM) {
        return (<SelectFormTab />);
    }
    else {
        return (<CenteredContent><p>Unknown fragment: {store.currentFragment}</p></CenteredContent>);
    }
});



export default observer(AdminFormComparePage);
