import { useAdminFormCompareStore } from "../storeCtx";
import { TimeDisplayUtil } from "@/domain/utils/TimeDisplayUtil";
import { NumberDisplayUtil } from "@/domain/utils/NumberDisplayUtil";
import { ReactNode } from "react";
import clsx from "clsx";
import { FormComparisonOverview } from "@/domain/models/admin/forms/compare/FormComparisonOverview";
import { NumMetricChangeStatus } from "@/domain/utils/NumberChangeMetric";

type ComparisonOverviewTableProps = {
    overview: FormComparisonOverview;
};

export const ComparisonOverviewTable = ({ overview }: ComparisonOverviewTableProps) => {

    const DiffText = {
        increase: (text: string) => <span className="text-green-600 font-medium">{text}</span>,
        decrease: (text: string) => <span className="text-red-600 font-medium">{text}</span>,
        neutral: (text?: string) => <span className="text-content-secondary font-medium">{text ?? "-"}</span>,
    };


    const store = useAdminFormCompareStore();
    const formDetails = store.compareFormDetails;

    function getPercentageDiffText() {
        const change = overview.avgPercentChange;
        if (!change) return DiffText.neutral();

        const absValue = NumberDisplayUtil.formatDecimal({
            number: Math.abs(change.value),
            roundTo: 2,
        });

        if (change.isIncrease) return DiffText.increase(`${absValue}% improved`);
        if (change.isDecrease) return DiffText.decrease(`${absValue}% reduced`);

        return DiffText.neutral("No Change");
    }

    function getAverageTimeDiffText() {
        const change = overview.avgTimeChange;
        if (!change) return DiffText.neutral();

        const formattedTime = TimeDisplayUtil.formatSeconds(Math.abs(change.value));

        if (change.isDecrease) return DiffText.increase(`${formattedTime} faster`);
        if (change.isIncrease) return DiffText.decrease(`${formattedTime} slower`);

        return DiffText.neutral("No Change");
    }

    function getPassRateDiffText() {
        const change = overview.passRateChange;
        if (!change) return DiffText.neutral();

        const absValue = NumberDisplayUtil.formatDecimal({
            number: Math.abs(change.value),
            roundTo: 2,
        });

        if (change.isIncrease) return DiffText.increase(`${absValue}% higher pass rate`);
        if (change.isDecrease) return DiffText.decrease(`${absValue}% lower pass rate`);

        return DiffText.neutral("No Change");
    }



    return (
        <div className="overflow-hidden">
            <table className="min-w-full table-bordered border-collapse">
                <thead className="table-head">
                    <tr>
                        <TableHeaderCell className="w-[150px]">Metric</TableHeaderCell>
                        <TableHeaderCell className="w-[150px] text-left">{formDetails.formALabel}</TableHeaderCell>
                        <TableHeaderCell className="w-[150px] text-left">{formDetails.formBLabel}</TableHeaderCell>
                        <TableHeaderCell className="w-[150px] text-left">Change</TableHeaderCell>
                    </tr>
                </thead>
                <tbody>
                    <ComparisonRow
                        label="Average Percentage"
                        formAValue={`${NumberDisplayUtil.formatDecimal({ number: (overview.formA.avgPercent), roundTo: 2 })}% (${NumberDisplayUtil.formatDecimal({ number: overview.formA.avgMarks, roundTo: 2 })}/${NumberDisplayUtil.formatDecimal({ number: formDetails.formA.totalMarks, roundTo: 2 })})`}
                        formBValue={`${NumberDisplayUtil.formatDecimal({ number: (overview.formB.avgPercent), roundTo: 2 })}% (${NumberDisplayUtil.formatDecimal({ number: overview.formB.avgMarks, roundTo: 2 })}/${NumberDisplayUtil.formatDecimal({ number: formDetails.formB.totalMarks, roundTo: 2 })})`}
                        diff={getPercentageDiffText()}
                        changeStatus={overview.avgPercentChange.status}
                    />
                    <ComparisonRow
                        label="Average Time Taken"
                        formAValue={TimeDisplayUtil.formatSeconds(overview.formA.avgTime)}
                        formBValue={TimeDisplayUtil.formatSeconds(overview.formB.avgTime)}
                        diff={getAverageTimeDiffText()}
                        changeStatus={overview.avgTimeChange.status}
                    />
                    <ComparisonRow
                        label="Pass Rate"
                        formAValue={overview.formA.passRate != null ? `${NumberDisplayUtil.formatDecimal({ number: overview.formA.passRate, roundTo: 2 })}%` : "-"}
                        formBValue={overview.formB.passRate != null ? `${NumberDisplayUtil.formatDecimal({ number: overview.formB.passRate, roundTo: 2 })}%` : "-"}
                        diff={getPassRateDiffText()}
                        changeStatus={overview.passRateChange?.status}
                    />
                </tbody>
            </table>
        </div>
    );
};


type TableHeaderCellProps = {
    children: React.ReactNode;
    className?: string;
};

const TableHeaderCell = ({ children, className }: TableHeaderCellProps) => {
    return (
        <th className={clsx('px-3 py-2 fs-md-m font-semibold text-content-primary uppercase text-left', className)}>
            {children}
        </th>
    );
};


type TableCellProps = {
    children: React.ReactNode;
    className?: string;
    isLabel?: boolean;
};

const TableCell = ({ children, className, isLabel }: TableCellProps) => {
    return (
        <td className={clsx(isLabel ? 'fw-medium' : 'fw-regular', 'px-3 py-2 fs-md-m text-content-primary', className)}>
            {children}
        </td>
    );
};

type ComparisonRowProps = {
    label: string;
    formAValue: string | number;
    formBValue: string | number;
    diff: ReactNode;
    changeStatus?: NumMetricChangeStatus;
};

const ComparisonRow = (props: ComparisonRowProps) => {
    return (
        <tr>
            <TableCell isLabel>{props.label}</TableCell>
            <TableCell className="text-left">{props.formAValue}</TableCell>
            <TableCell className="text-left">{props.formBValue}</TableCell>
            <TableCell className="text-left">
                {props.diff}
            </TableCell>
        </tr>
    );
};