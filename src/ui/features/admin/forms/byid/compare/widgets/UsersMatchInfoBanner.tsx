import { AdminFormCompareStore } from "../store";

export function UsersMatchInfoBanner({ store }: { store: AdminFormCompareStore }) {
    const { compareFormDetails } = store;

    const isSameMarks = compareFormDetails.isSameTotalMarks;
    const totalMarksA = compareFormDetails.formA.totalMarks;
    const totalMarksB = compareFormDetails.formB.totalMarks;

    const totalResponsesA = compareFormDetails.base.formA.totalResponses;
    const totalResponsesB = compareFormDetails.base.formB.totalResponses;
    const commonResponses = compareFormDetails.base.commonResponsesCount;

    const isSameUserCount = commonResponses === totalResponsesA && commonResponses === totalResponsesB;

    return (
        <div className="p-4 rounded-md border space-y-2 bg-white shadow-sm">
            {/* Total Marks Comparison Message */}
            <div className={`p-3 rounded-md border text-sm
                ${isSameMarks
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : "bg-blue-50 border-blue-200 text-blue-800"}`}>
                {isSameMarks ? (
                    <>Both assessments have the same total marks (<strong>{totalMarksA}</strong>). Marks comparison is valid.</>
                ) : (
                    <>The selected assessments have different total marks (<strong>{totalMarksA}</strong> vs <strong>{totalMarksB}</strong>). Consider using <strong>percentage comparison</strong> for better insight.</>
                )}
            </div>

            {/* User Count Comparison Message */}
            <div className={`p-3 rounded-md border text-sm
                ${isSameUserCount
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : "bg-yellow-50 border-yellow-200 text-yellow-800"}`}>
                {isSameUserCount ? (
                    <>All users who took the assessments are included in this comparison (<strong>{commonResponses}</strong> users).</>
                ) : (
                    <>Only <strong>{commonResponses}</strong> users who completed both assessments are included in this comparison. This may not represent all users who took each assessment.</>
                )}
            </div>

            {/* Show More Details Button */}
            <div className="flex justify-end pt-2">
                <button
                    onClick={() => store.openDetailsDialog?.()} // assumed handler
                    className="text-sm text-blue-600 hover:underline font-medium"
                >
                    Show more details
                </button>
            </div>
        </div>
    );
}
