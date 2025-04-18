import { FormComparisonOverview } from "@/domain/models/admin/forms/compare/FormComparisonOverview";
import { NumberDisplayUtil } from "@/domain/utils/NumberDisplayUtil";
import { TimeDisplayUtil } from "@/domain/utils/TimeDisplayUtil";
import { Bar, BarChart, CartesianGrid, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAdminFormCompareStore } from "../storeCtx";


type ChartContainerCardProps = {
    title: string;
    children: React.ReactNode;
};

const ChartContainerCard = ({ title, children }: ChartContainerCardProps) => {
    return (
        <div className="p-4 w-full sm:min-w-[300px] sm:max-w-[300px]">
            <h3 className="fs-md font-semibold text-content-primary mb-4">{title}</h3>
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

const PassRateChart = (props: PassRateChartProps) => {

    return (
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
};





type CompareOverviewChartsProps = {
    overview: FormComparisonOverview;
};

type ChartDataType = {
    label: string;
    totalMarks: number;
    avgMarks: number;
    avgPercent: number;
    avgTime: number;
    passCount: number | null;
    passRate: number | null;
    totalUser: number;
}

export const CompareOverviewCharts = ({ overview }: CompareOverviewChartsProps) => {
    const store = useAdminFormCompareStore();
    const { compareFormDetails } = store;

    const chartData: ChartDataType[] = [
        {
            label: compareFormDetails.formALabel,
            totalMarks: compareFormDetails.formA.totalMarks,
            avgMarks: overview.formA.avgMarks,
            avgPercent: overview.formA.avgPercent,
            avgTime: overview.formA.avgTime,
            passCount: overview.formA.passCount,
            passRate: overview.formA.passRate,
            totalUser: compareFormDetails.formA.totalResponses,
        },
        {
            label: compareFormDetails.formBLabel,
            totalMarks: compareFormDetails.formB.totalMarks,
            avgMarks: overview.formB.avgMarks,
            avgPercent: overview.formB.avgPercent,
            avgTime: overview.formB.avgTime,
            passCount: overview.formB.passCount,
            passRate: overview.formB.passRate,
            totalUser: compareFormDetails.formB.totalResponses,
        }
    ];

    return (
        <div className="flex gap-4 justify-start flex-wrap border-t border-gray-200">
            <AveragePercentageChart data={chartData} />
            <AverageTimeTakenChart data={chartData} />
            {overview.passRateChange && (<PassRateChart data={chartData} />)}
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
