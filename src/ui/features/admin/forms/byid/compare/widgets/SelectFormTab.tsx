import { useState } from "react";
import SelectAssessmentDialog from "../SelectFormDialog/SelectFormDialog";
import { useAdminFormCompareStore } from "../storeCtx";
import { FilledButton } from "@/ui/widgets/buttons/FilledButton";
import { FormCompareItem } from "@/domain/models/admin/forms/compare/FormCompareItem";
import { FormCompareDetailsVm } from "../Models";
import { OutlinedButton } from "@/ui/widgets/buttons/OutlinedButton";
import { toast } from 'sonner';
import { AppException } from "@/core/exceptions/AppException";

export default function SelectFormTab() {
    const store = useAdminFormCompareStore();
    const recommendedForm = store.metaData.recommendedForm;
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <div>
            <SelectAssessmentDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} />

            <div className="flex flex-col p-page space-y-4 max-w-3xl mx-auto">

                {/* Title and Description and Action Button */}
                <div className="text-center mb-6">
                    <h2 className="fs-lg-m font-semibold text-content-primary">Compare Assessment Performance</h2>
                    <p className="fs-md text-content-secondary mt-1">
                        Choose another assessment to compare key metrics like scores, pass rates, and completion times to see how performance has evolved.
                    </p>
                    <FilledButton className="mt-6" theme="primary" onClick={() => setDialogOpen(true)}>
                        Select Assessment to Compare
                    </FilledButton>
                </div>


                {/* Recommendations List */}
                {recommendedForm && (
                    <>
                        {/* "OR" Divider */}
                        <div className="flex items-center my-2">
                            <div className="flex-grow border-t border-default"></div>
                            <span className="mx-4 text-content-secondary">OR</span>
                            <div className="flex-grow border-t border-default"></div>
                        </div>

                        <div>
                            <h3 className="fs-md font-semibold text-content-primary mb-2">
                                Compare with {recommendedForm.assessmentType!.name} Assessment
                            </h3>
                            <div className="w-full space-y-4">
                                <RecommendationItem
                                    form={recommendedForm}
                                    onClick={async () => {
                                        try {
                                            let response = (await store.getFormCompareDetails({ formBId: recommendedForm.id })).getOrThrow();
                                            store.onFormSelected(new FormCompareDetailsVm(response));
                                        }
                                        catch (e) {
                                            let appException = e as AppException;
                                            toast.error(appException.message);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </>
                )}

            </div>

        </div>
    );
}


type RecommendationItemProps = {
    form: FormCompareItem;
    onClick: (form: FormCompareItem) => void;
};

function RecommendationItem({ form, onClick }: RecommendationItemProps) {
    return (
        <div
            onClick={() => onClick(form)}
            className="flex justify-between items-center border border-default p-4 shadow-sm bg-surface cursor-pointer rounded-sm"
        >
            <div>
                {form.assessmentType && (<div>
                    <span className="inline-flex bg-primary-subtle text-primary font-medium px-2 py-1 rounded-sm fs-sm-p">
                        {form.assessmentType.name}
                    </span>
                </div>)}
                <p className="font-semibold fs-md text-content-primary mt-1">{form.title}</p>
                <p className="fs-sm-p text-content-secondary">
                    {form.totalResponses} responses • {form.totalQuestions} questions • {form.totalMarks} marks
                </p>
            </div>

            <OutlinedButton
                size="sm"
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(form);
                }}
            >
                Select
            </OutlinedButton>
        </div>
    );
}



