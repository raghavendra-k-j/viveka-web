"use client";

import { observer } from "mobx-react-lite";
import { useAdminFormCompareStore } from "./storeContext";
import AppErrorView from "@/ui/widgets/error/AppErrorView";
import Loader from "@/ui/widgets/loaders/Loader";
import { CompareTabFragment } from "./controller";
import { Description, Dialog, DialogDescription, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from "react";
import SelectAssessmentDialog from "./SelectAssessmentDialog";
import OverviewTable from "./OverviewTable";
import CompareResultTab from "./CompareResult";



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





function SelectAssessmentTab() {
    const store = useAdminFormCompareStore();
    const recommendations = store.recommendationRes.recommendedForms;
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <div className="flex flex-col items-center p-6 max-w-3xl mx-auto w-full">
            <SelectAssessmentDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} />

            <button
                className="mb-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                onClick={() => { setDialogOpen(true) }}
            >
                Select Another Assessment
            </button>

            {recommendations.length > 0 && (
                <div className="w-full space-y-4">
                    {recommendations.map((form, index) => (
                        <RecommendationItem key={index} form={form} />
                    ))}
                </div>
            )}

        </div>
    );
}


type RecommendationItemProps = {
    form: {
        title: string;
        totalResponses: number;
        totalQuestions: number;
        totalMarks: number;
    };
};

function RecommendationItem({ form }: RecommendationItemProps) {
    return (
        <div className="border rounded p-4 shadow hover:shadow-md transition">
            <p className="font-semibold text-lg">{form.title}</p>
            <p className="text-sm text-gray-600">
                {form.totalResponses} responses • {form.totalQuestions} questions • {form.totalMarks} marks
            </p>
        </div>
    );
}









export default observer(AdminFormComparePage);
