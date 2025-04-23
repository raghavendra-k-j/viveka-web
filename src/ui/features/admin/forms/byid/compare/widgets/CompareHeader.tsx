import React, { ReactNode, useState } from "react";
import { useAdminFormCompareStore } from "../storeCtx";
import { FormCompareDetail } from "@/domain/models/admin/forms/compare/FormCompareDetail";
import {
    FileText,
    ListChecks,
    Users,
    ShieldCheck,
    MoveUp,
} from "lucide-react";
import { NumberDisplayUtil } from "@/domain/utils/NumberDisplayUtil";
import { AdminFormCompareStore } from "../store";
import { FormLabelView } from "./FormLabelView";
import { OutlinedButton } from "@/ui/widgets/buttons/OutlinedButton";

type FormMetaItemProps = {
    icon: React.ReactNode;
    label: React.ReactNode;
    value: React.ReactNode;
};

function FormMetaItem({ icon, label, value }: FormMetaItemProps) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-content-secondary w-4 h-4">{icon}</span>
            <span className="font-medium">{label}: </span>
            <span className="font-regular">{value}</span>
        </div>
    );
}

type ImprovementCircleProps = {
    store: AdminFormCompareStore;
};

export function ImprovementCircle({ store }: ImprovementCircleProps) {
    const { compareFormDetails, overviewData } = store;
    const percentChange = overviewData.avgPercentChange;
    const rawValue = percentChange.value;

    let textClass = "text-content-primary";
    let sign = "";
    let icon: ReactNode;

    if (percentChange.isIncrease) {
        textClass = "text-emerald-600";
        sign = "+";
        icon = <MoveUp className="w-4 h-4" />;
    }
    else if (percentChange.isDecrease) {
        textClass = "text-red-600";
        sign = "–";
        icon = <MoveUp className="w-4 h-4 rotate-180" />;
    }

    return (
        <div className="p-3 mt-4 relative z-10 min-w-[72px] min-h-[72px] flex flex-col justify-center items-center rounded-sm bg-surface border border-default shadow-inner text-center space-y-1">
            <p className="fs-sm-p font-medium text-content-secondary">
                {compareFormDetails.base.commonResponsesCount === 1
                    ? "1 Matching User"
                    : `${compareFormDetails.base.commonResponsesCount} Matching Users`}
            </p>
            <p className={`fs-lg font-bold ${textClass}`}>
                <span className="flex items-center">{sign}{NumberDisplayUtil.formatDecimal({ number: Math.abs(rawValue), roundTo: 2 })}% {icon}</span>
            </p>
            <p className="fs-sm-p text-content-secondary px-2">
                Avg Percentage
            </p>
        </div>
    );
}

type FormBlockProps = {
    form: FormCompareDetail;
    label: string;
    onLabelChange: (newLabel: string) => void;
};

function FormBlock(props: FormBlockProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [labelText, setLabelText] = useState(props.label);
    const iconClassName = "w-full h-full";

    const metaItems = [
        {
            icon: <FileText className={iconClassName} />,
            label: "Questions",
            value: props.form.totalQuestions
        },
        {
            icon: <ListChecks className={iconClassName} />,
            label: "Marks",
            value: NumberDisplayUtil.formatDecimal({ number: props.form.totalMarks, roundTo: 2 })
        },
        {
            icon: <ShieldCheck className={iconClassName} />,
            label: "Passing Marks",
            value: (props.form.passingMarks === undefined || props.form.passingMarks === null) ? "N/A" : NumberDisplayUtil.formatDecimal({ number: props.form.passingMarks, roundTo: 2 })
        },
        {
            icon: <Users className={iconClassName} />,
            label: "Responses",
            value: props.form.totalResponses
        }
    ];

    const handleSave = () => {
        setIsEditing(false);
        props.onLabelChange(labelText);
    };

    return (
        <div className="flex flex-col flex-1 space-y-2 p-4">
            <FormLabelView
                label={props.label}
                onLabelChange={props.onLabelChange}
            />
            <p className="fs-md-p font-semibold text-content-primary overflow-hidden text-ellipsis line-clamp-2">
                {props.form.title}
            </p>
            <div className="fs-md text-content-secondary font-medium grid grid-cols-2 gap-x-4 gap-y-2">
                {metaItems.map((item, idx) => (
                    <FormMetaItem key={idx} {...item} />
                ))}
            </div>
        </div>
    );
}

export function CompareHeader() {
    const store = useAdminFormCompareStore();
    const { compareFormDetails } = store;
    const { formA, formB } = compareFormDetails.base;

    const handleFormALabelChange = (newLabel: string) => {
        store.updateFormALabel(newLabel);
    };

    const handleFormBLabelChange = (newLabel: string) => {
        store.updateFormBLabel(newLabel);
    };

    return (
        <div className="relative flex flex-row bg-surface shadow-sm gap-4 items-start">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 z-0" />

            <FormBlock
                form={formA}
                label={compareFormDetails.formALabel}
                onLabelChange={handleFormALabelChange}
            />

            <ImprovementCircle store={store} />

            <FormBlock
                form={formB}
                label={compareFormDetails.formBLabel}
                onLabelChange={handleFormBLabelChange}
            />
        </div>
    );
}
