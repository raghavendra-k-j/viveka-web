import { Column, Expanded } from "@/ui/widgets/core/box";
import { DialogCard, DialogFooter, DialogHeader } from "@/ui/widgets/dialogs/DialogCard";

export default function SelectAssessmentDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    return (
        <DialogCard isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col h-full max-h-[90vh]">
                <DialogHeader onClose={onClose}>Select Assessment</DialogHeader>

                <SearchBar />

                {/* Scrollable list area */}
                <div className="flex-1 overflow-y-auto">
                    <ListOfAssessments />
                </div>

                <DialogFooter>
                    <button className="btn-primary" onClick={onClose}>Done</button>
                </DialogFooter>
            </div>
        </DialogCard>
    );
}


function SearchBar() {
    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Search for an assessment..."
                className="w-full p-2 border rounded"
            />
        </div>
    );
}

function ListOfAssessments() {
    return (
        <div className="p-4 space-y-2">
            <AssessmentItem title="Assessment 1" totalResponses={100} totalQuestions={10} totalMarks={50} />
            <AssessmentItem title="Assessment 2" totalResponses={200} totalQuestions={20} totalMarks={100} />
            <AssessmentItem title="Assessment 3" totalResponses={150} totalQuestions={15} totalMarks={75} />
            <AssessmentItem title="Assessment 3" totalResponses={150} totalQuestions={15} totalMarks={75} />
            <AssessmentItem title="Assessment 3" totalResponses={150} totalQuestions={15} totalMarks={75} />
            <AssessmentItem title="Assessment 3" totalResponses={150} totalQuestions={15} totalMarks={75} />
            <AssessmentItem title="Assessment 3" totalResponses={150} totalQuestions={15} totalMarks={75} />
            <AssessmentItem title="Assessment 3" totalResponses={150} totalQuestions={15} totalMarks={75} />
            <AssessmentItem title="Assessment 3" totalResponses={150} totalQuestions={15} totalMarks={75} />
        </div>
    );
}

function AssessmentItem({ title, totalResponses, totalQuestions, totalMarks }: {
    title: string;
    totalResponses: number;
    totalQuestions: number;
    totalMarks: number;
}) {
    return (
        <div className="p-4 border rounded shadow hover:shadow-md transition">
            <p className="font-semibold text-lg">{title}</p>
            <p className="text-sm text-gray-600">
                {totalResponses} responses • {totalQuestions} questions • {totalMarks} marks
            </p>
        </div>
    );
}
