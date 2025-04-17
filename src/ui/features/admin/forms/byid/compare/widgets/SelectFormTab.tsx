import { useState } from "react";
import SelectAssessmentDialog from "../SelectFormDialog/SelectFormDialog";
import { useAdminFormCompareStore } from "../storeCtx";
import { FilledButton } from "@/ui/widgets/buttons/FilledButton";
import { FormCompareItem } from "@/domain/models/admin/forms/compare/FormCompareItem";

export default function SelectFormTab() {
    const store = useAdminFormCompareStore();
    const recommendations = store.recommendationRes.recommendedForms;
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <div>
            <SelectAssessmentDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} />

            <div className="flex flex-col p-page space-y-4 max-w-3xl mx-auto">

                {/* Title and Description and Action Button */}
                <div className="text-center mb-6">
                    <h2 className="fs-lg font-semibold text-content-primary">Select another assessment to compare with this one</h2>
                    <p className="fs-md text-content-secondary mt-1">
                        Use this feature to analyze and compare marks, time taken, pass rates, and user progress between assessments. Click the button below to choose one.
                    </p>
                    <FilledButton className="mt-6" theme="primary" onClick={() => setDialogOpen(true)}>
                        Choose Assessment to Compare
                    </FilledButton>
                </div>
               

                {/* Recommendations List */}
                {recommendations.length > 0 && (
                    <div className="w-full space-y-4">
                        {recommendations.map((form, index) => (
                            <RecommendationItem key={index} form={form} />
                        ))}
                    </div>
                )}
            </div>

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
    form: FormCompareItem;
};

function RecommendationItem({ form }: RecommendationItemProps) {
    return (
        <div className="border p-4 shadow hover:shadow-md transition">
            <p className="font-semibold text-lg">{form.title}</p>
            <p className="text-sm text-gray-600">
                {form.totalResponses} responses • {form.totalQuestions} questions • {form.totalMarks} marks
            </p>
        </div>
    );
}


