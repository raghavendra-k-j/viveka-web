import { Loader } from "@/ui/widgets/loaders/Loader";
import { useAdminFormCompareStore } from "../storeCtx";
import AppErrorView from "@/ui/widgets/error/AppErrorView";
import { observer } from 'mobx-react-lite';
import { TimeDisplayUtil } from "@/domain/utils/TimeDisplayUtil";
import { NumberDisplayUtil } from "@/domain/utils/NumberDisplayUtil";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Label } from 'recharts';
import { FormComparisonOverviewRes } from "@/domain/models/admin/forms/compare/FormComparisonOverview";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { CompareSectionCard, CompareSectionCardTitle } from "./SectionCard";
import { ReactNode, useEffect, useState } from "react";
import clsx from "clsx";
import { FilledButton } from "@/ui/widgets/buttons/FilledButton";
import { ChangeStatus } from "@/core/types/ChangeStatus";
import { TrendingDown, TrendingUp } from "lucide-react";


type CenteredProps = {
    children: React.ReactNode;
};

export const Centered = ({ children }: CenteredProps) => (
    <div className="flex items-center justify-center min-h-[200px]">
        {children}
    </div>
);


const CompareOverviewSection = observer(() => {

    const store = useAdminFormCompareStore();
    const { overviewState } = store;

    useEffect(() => {
        if (overviewState.isInitial) {
            store.getComparisonOverview();
        }
    }, [overviewState]);

    if (overviewState.isLoading) {
        return (
            <CompareSectionCard>
                <Centered>
                    <Loader />
                </Centered>
            </CompareSectionCard>
        );
    }

    if (overviewState.isError) {
        const e = overviewState.error!;
        return (
            <CompareSectionCard>
                <Centered>
                    <AppErrorView message={e.message} description={e.description} actions={[
                        <FilledButton onClick={() => store.getComparisonOverview()}>Retry</FilledButton>
                    ]} />
                </Centered>
            </CompareSectionCard>
        );
    }

    const overview = overviewState.data;
    if (!overview) {
        return (
            <CompareSectionCard>
                <Centered>
                    <Loader />
                </Centered>
            </CompareSectionCard>
        );
    }

    return (
        <CompareSectionCard>
            <TabGroup>
                <div className="flex justify-between items-center px-3 py-2">
                    <CompareSectionCardTitle className="mr-2">Overall Comparision Summary</CompareSectionCardTitle>
                    <TabList className="flex space-x-1">
                        <TabItem>Charts</TabItem>
                        <TabItem>Table</TabItem>
                    </TabList>
                </div>
                <TabPanels>
                    <TabPanel>
                        <CompareOverviewCharts overview={overview} />
                    </TabPanel>
                    <TabPanel>
                        <ComparisionTable overview={overview} />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </CompareSectionCard>
    );
});


export default CompareOverviewSection;

// #region: TabItem
type TabItemProps = {
    children: React.ReactNode;
};

export const TabItem = ({ children }: TabItemProps) => {
    return (
        <Tab
            className={({ selected }) =>
                clsx(
                    "px-4 py-1 border rounded-sm fs-md cursor-pointer fw-medium",
                    selected ? "bg-primary-subtle text-primary" : "bg-surface text-content-primary"
                )
            }
        >
            {children}
        </Tab>
    );
};

// #endregion: TabItem


type TableHeaderCellProps = {
    children: React.ReactNode;
    className?: string;
};

const TableHeaderCell = ({ children, className }: TableHeaderCellProps) => {
    return (
        <th className={clsx('px-3 py-2 fs-md-m  fw-semibold text-content-primary uppercase text-left border border-gray-300', className)}>
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
        <td className={clsx(isLabel ? 'fw-medium' : 'fw-regular', 'px-3 py-2 fs-md-m text-content-primary border border-gray-300', className)}>
            {children}
        </td>
    );
};


// StyledTable component
type ComparisionTableProps = {
    overview: FormComparisonOverviewRes;
};


const ComparisionTable = ({ overview }: ComparisionTableProps) => {

    function getPercentageDiffText() {
        const value = overview.avgPercentDiff;
        if (value == null) {
            return <span>-</span>;
        }

        const absValue = NumberDisplayUtil.formatDecimal({ number: Math.abs(value), roundTo: 2 });

        if (overview.avgPercentChangeStatus === ChangeStatus.Increase) {
            return <span className="text-green-600">{`${absValue}% improved`}</span>;
        } else if (overview.avgPercentChangeStatus === ChangeStatus.Decrease) {
            return <span className="text-red-600">{`${absValue}% reduced`}</span>;
        }

        return <span>-</span>;
    }

    function getAverageTimeDiffText() {
        const value = overview.avgTimeDiff;
        if (value == null) {
            return <span>-</span>;
        }

        const formattedTime = TimeDisplayUtil.formatSeconds(Math.abs(value));

        if (overview.avgTimeChangeStatus === ChangeStatus.Decrease) {
            return <span className="text-green-600">{formattedTime} faster</span>;
        } else if (overview.avgTimeChangeStatus === ChangeStatus.Increase) {
            return <span className="text-red-600">{formattedTime} slower</span>;
        }

        return <span>-</span>;
    }

    function getPassRateDiffText() {
        const value = overview.passRateDiff;
        if (value == null) {
            return <span>-</span>;
        }

        const absValue = NumberDisplayUtil.formatDecimal({ number: Math.abs(value), roundTo: 1 });

        if (overview.passRateChangeStatus === ChangeStatus.Increase) {
            return <span>{`${absValue}% higher pass rate`}</span>;
        } else if (overview.passRateChangeStatus === ChangeStatus.Decrease) {
            return <span>{`${absValue}% lower pass rate`}</span>;
        }
        return <span>-</span>;
    }


    return (
        <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        <TableHeaderCell className="w-[150px]">Metric</TableHeaderCell>
                        <TableHeaderCell className="w-[150px] text-left">{overview.formALabel}</TableHeaderCell>
                        <TableHeaderCell className="w-[150px] text-left">{overview.formBLabel}</TableHeaderCell>
                        <TableHeaderCell className="w-[150px] text-left">Change</TableHeaderCell>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <ComparisonRow
                        label="Average Percentage"
                        formAValue={`${NumberDisplayUtil.formatDecimal({ number: (overview.formAAvgPercent), roundTo: 2 })}% (${NumberDisplayUtil.formatDecimal({ number: overview.formAAvgMarks, roundTo: 2 })}/${NumberDisplayUtil.formatDecimal({ number: overview.formATotalMarks, roundTo: 2 })})`}
                        formBValue={`${NumberDisplayUtil.formatDecimal({ number: (overview.formBAvgPercent), roundTo: 2 })}% (${NumberDisplayUtil.formatDecimal({ number: overview.formBAvgMarks, roundTo: 2 })}/${NumberDisplayUtil.formatDecimal({ number: overview.formBTotalMarks, roundTo: 2 })})`}
                        diff={getPercentageDiffText()}
                        changeStatus={overview.avgPercentChangeStatus}
                    />
                    <ComparisonRow
                        label="Average Time Taken"
                        formAValue={TimeDisplayUtil.formatSeconds(overview.formAAvgTime)}
                        formBValue={TimeDisplayUtil.formatSeconds(overview.formBAvgTime)}
                        diff={getAverageTimeDiffText()}
                        changeStatus={overview.avgTimeChangeStatus}
                    />
                    <ComparisonRow
                        label="Pass Rate"
                        formAValue={overview.formAPassRate != null ? `${NumberDisplayUtil.formatDecimal({ number: overview.formAPassRate, roundTo: 2 })}%` : "-"}
                        formBValue={overview.formBPassRate != null ? `${NumberDisplayUtil.formatDecimal({ number: overview.formBPassRate, roundTo: 2 })}%` : "-"}
                        diff={getPassRateDiffText()}
                        changeStatus={overview.passRateChangeStatus}
                    />
                </tbody>
            </table>
        </div>
    );
};

// ComparisonRow component
type ComparisonRowProps = {
    label: string;
    formAValue: string | number;
    formBValue: string | number;
    diff: ReactNode;
    changeStatus: ChangeStatus;
};

const ComparisonRow = (props: ComparisonRowProps) => {

    let diffClass = "";
    if (props.changeStatus == ChangeStatus.Increase) {
        diffClass += "text-green-600";
    }
    else if (props.changeStatus == ChangeStatus.Decrease) {
        diffClass += "text-red-600";
    }
    else {
        diffClass += "text-gray-500";
    }

    return (
        <tr className="hover:bg-gray-50 transition-colors duration-150">
            <TableCell isLabel>{props.label}</TableCell>
            <TableCell className="text-left">{props.formAValue}</TableCell>
            <TableCell className="text-left">{props.formBValue}</TableCell>
            <TableCell className="text-left">
                <span className={clsx("fs-md-m fw-medium", diffClass)}>
                    {props.diff}
                </span>
            </TableCell>
        </tr>
    );
};






type ChartContainerCardProps = {
    title: string;
    children: React.ReactNode;
};

const ChartContainerCard = ({ title, children }: ChartContainerCardProps) => {
    return (
        <div className="p-4 w-full sm:min-w-[300px] sm:max-w-[300px]">
            <h3 className="fs-md fw-semibold text-content-primary mb-4">{title}</h3>
            <div className="h-[240px]">
                {children}
            </div>
        </div>
    );
};




type TooltipProps = {
    active?: boolean;
    label: string;
    value: any;
    formatter: (value: any) => string;
};

export const TooltipView = (props: TooltipProps) => {
    if (!props.active) return null;

    return (
        <div className="bg-surface shadow-md px-3 py-2 fs-md border border-gray-200">
            <p className="fw-semibold text-content-primary">{props.label}</p>
            <p className="text-content-secondary">
                {props.formatter(props.value)}
            </p>
        </div>
    );
};

type AveragePercentageChartProps = {
    data: ChartDataType[];
};

const AveragePercentageChart = (props: AveragePercentageChartProps) => (
    <ChartContainerCard title="Average Percentage">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={props.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" tick={commonTickStyle} />
                <YAxis domain={[0, 100]} tick={commonTickStyle}>
                    <Label
                        style={commonLabelStyle}
                        angle={-90}
                        position="center"
                        dx={-10}
                    >
                        Percentage (%)
                    </Label>
                </YAxis>
                <Tooltip
                    content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;

                        const { label, avgPercent, totalMarks, avgMarks } = payload[0].payload;
                        const formatted = `${NumberDisplayUtil.formatDecimal({ number: avgPercent, roundTo: 2 })}% (${NumberDisplayUtil.formatDecimal({ number: avgMarks, roundTo: 2 })}/${NumberDisplayUtil.formatDecimal({ number: totalMarks, roundTo: 2 })} Marks)`;

                        return (
                            <TooltipView
                                active={active}
                                label={label}
                                value={avgPercent}
                                formatter={() => formatted}
                            />
                        );
                    }}
                />
                <Bar dataKey="avgPercent" fill="#6366f1" barSize={30} />
            </BarChart>
        </ResponsiveContainer>
    </ChartContainerCard>
);

type AverageTimeTakenChartProps = {
    data: ChartDataType[];
};

const AverageTimeTakenChart = (props: AverageTimeTakenChartProps) => (
    <ChartContainerCard title="Average Time Taken">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={props.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" tick={commonTickStyle} />
                <YAxis tick={commonTickStyle}>
                    <Label
                        style={commonLabelStyle}
                        angle={-90}
                        position="center"
                        dx={-10}
                    >
                        Time Taken (s)
                    </Label>
                </YAxis>
                <Tooltip
                    content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;

                        const { label, avgTime } = payload[0].payload;
                        const formatted = `${TimeDisplayUtil.formatSeconds(avgTime)}`;

                        return (
                            <TooltipView
                                active={active}
                                label={label}
                                value={avgTime}
                                formatter={() => formatted}
                            />
                        );
                    }}
                />
                <Bar dataKey="avgPercent" fill="#00bc7d" barSize={30} />
            </BarChart>
        </ResponsiveContainer>
    </ChartContainerCard>
);


type PassRateChartProps = {
    data: ChartDataType[];
};

const PassRateChart = (props: PassRateChartProps) => (
    <ChartContainerCard title="Pass Rate">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={props.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" tick={commonTickStyle} />
                <YAxis tick={commonTickStyle}>
                    <Label
                        style={commonLabelStyle}
                        angle={-90}
                        position="center"
                        dx={-10}
                    >
                        Pass Rate (%)
                    </Label>
                </YAxis>
                <Tooltip
                    content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;

                        const { label, passRate, passCount, totalUser } = payload[0].payload;
                        const formatted = `${NumberDisplayUtil.formatDecimal({ number: passRate, roundTo: 2 })}% (${passCount}/${totalUser} Users)`;

                        return (
                            <TooltipView
                                active={active}
                                label={label}
                                value={passRate}
                                formatter={() => formatted}
                            />
                        );
                    }}
                />
                <Bar dataKey="passRate" fill="#fe9a00" barSize={30} />
            </BarChart>
        </ResponsiveContainer>
    </ChartContainerCard>
);




type CompareOverviewChartsProps = {
    overview: FormComparisonOverviewRes;
};

type ChartDataType = {
    label: string;
    totalMarks: number;
    avgMarks: number;
    avgPercent: number;
    avgTime: number;
    totalUser: number;
    passCount: number | null;
    passRate: number | null;
}

export const CompareOverviewCharts = ({ overview }: CompareOverviewChartsProps) => {
    const { formALabel, formBLabel } = overview;

    const chartData: ChartDataType[] = [
        {
            label: formALabel,
            totalMarks: overview.formATotalMarks,
            avgMarks: overview.formAAvgMarks,
            avgPercent: overview.formAAvgPercent,
            avgTime: overview.formAAvgTime,
            totalUser: overview.formATotalResponses,
            passCount: overview.formAPassCount,
            passRate: overview.formAPassRate
        },
        {
            label: formBLabel,
            totalMarks: overview.formBTotalMarks,
            avgMarks: overview.formBAvgMarks,
            avgPercent: overview.formBAvgPercent,
            avgTime: overview.formBAvgTime,
            totalUser: overview.formBTotalResponses,
            passCount: overview.formBPassCount,
            passRate: overview.formBPassRate
        }
    ];

    return (
        <div className="flex gap-4 justify-start flex-wrap border-t border-gray-200">
            <AveragePercentageChart data={chartData} />
            <AverageTimeTakenChart data={chartData} />
            {overview.hasPassRateComparison && (<PassRateChart data={chartData} />)}
        </div>
    );
};

const commonTickStyle = {
    fontSize: 12,
    fill: '#374151',
};

const commonLabelStyle = {
    fontSize: 13,
    fill: '#6b7280',
};
