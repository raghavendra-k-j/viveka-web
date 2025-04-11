import { useState } from "react";
import SelectAssessmentDialog from "./SelectAssessmentDialog";
import { useAdminFormCompareStore } from "./storeContext";
import { FilledButton } from "@/ui/widgets/buttons/FilledButton";

export default function SelectAssessmentTab() {
    const store = useAdminFormCompareStore();
    const recommendations = store.recommendationRes.recommendedForms;
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <div className="flex flex-col items-center p-6 max-w-3xl mx-auto w-full">
            <SelectAssessmentDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} />

            <div className="flex flex-col items-center p-6 max-w-3xl mx-auto w-full space-y-6">
                <SelectAssessmentDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} />

                {/* Title and Description */}
                <div className="text-center">
                    <h2 className="fs-lg fw-semibold text-content-primary">Select another assessment to compare with this one</h2>
                    <p className="fs-md text-content-secondary">
                        Use this feature to analyze and compare marks, time taken, pass rates, and user progress between assessments. Click the button below to choose one.                    </p>
                </div>

                {/* Action Button */}
                <FilledButton theme="primary" onClick={() => setDialogOpen(true)}>
                    Choose Assessment to Compare
                </FilledButton>

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


