import { FormComparisonOverview } from "@/domain/models/admin/forms/compare/FormComparisonOverview";
import { NumberDisplayUtil } from "@/domain/utils/NumberDisplayUtil";
import { TimeDisplayUtil } from "@/domain/utils/TimeDisplayUtil";
import { Bar, BarChart, CartesianGrid, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAdminFormCompareStore } from "../storeCtx";

type TooltipProps = {
    active?: boolean;
    label: string;
    value: any;
    formatter: (value: any) => string;
};

const TooltipView = (props: TooltipProps) => {
    if (!props.active) return null;

    return (
        <div className="bg-surface shadow-md px-3 py-2 fs-md border border-default rounded-sm">
            <p className="font-semibold text-content-primary">{props.label}</p>
            <p className="text-content-secondary">{props.formatter(props.value)}</p>
        </div>
    );
};

type ChartContainerCardProps = {
    title: string;
    children: React.ReactNode;
};

const ChartContainerCard = ({ title, children }: ChartContainerCardProps) => (
    <div className="p-4 w-full sm:flex-1 sm:min-w-[18rem] sm:max-w-[20rem]">
        <h3 className="fs-md font-semibold text-content-primary mb-4">{title}</h3>
        <div className="h-[15rem]">{children}</div>
    </div>
);


type ChartDataType = {
    label: string;
    totalMarks: number;
    avgMarks: number;
    avgPercent: number;
    avgTime: number;
    passCount: number | null;
    passRate: number | null;
    totalUser: number;
};

type ReusableBarChartProps = {
    data: ChartDataType[];
    title: string;
    dataKey: string;
    yTickFormatter: (value: any) => string;
    tooltipFormatter: (value: any, label: string) => string;
    barColor: string;
    yLabel: string;
    yDomain?: [number, number];
};

const ReusableBarChart = ({
    data,
    title,
    dataKey,
    yTickFormatter,
    tooltipFormatter,
    barColor,
    yLabel,
    yDomain = [0, 100],
}: ReusableBarChartProps) => (
    <ChartContainerCard title={title}>
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="label" tick={commonTickStyle} />
                <YAxis
                    domain={yDomain}
                    tick={commonTickStyle}
                    tickFormatter={(value) => yTickFormatter(value)}
                >
                    <Label style={commonLabelStyle} angle={-90} position="center" dx={-20}>
                        {yLabel}
                    </Label>
                </YAxis>
                <Tooltip
                    content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;

                        const { label, ...rest } = payload[0].payload;
                        const formatted = tooltipFormatter(rest, label);

                        return (
                            <TooltipView active={active} label={label} value={rest[dataKey]} formatter={() => formatted} />
                        );
                    }}
                />
                <Bar dataKey={dataKey} fill={barColor} barSize={30} />
            </BarChart>
        </ResponsiveContainer>
    </ChartContainerCard>
);

const AveragePercentageChart = (props: { data: ChartDataType[] }) => (
    <ReusableBarChart
        data={props.data}
        title="Average Percentage"
        dataKey="avgPercent"
        yTickFormatter={(value) => `${NumberDisplayUtil.formatDecimal({ number: value, roundTo: 2 })}%`}
        tooltipFormatter={(value, label) => {
            const { avgPercent, totalMarks, avgMarks } = value;
            return `${NumberDisplayUtil.formatDecimal({ number: avgPercent, roundTo: 2 })}% (${NumberDisplayUtil.formatDecimal({ number: avgMarks, roundTo: 2 })}/${NumberDisplayUtil.formatDecimal({ number: totalMarks, roundTo: 2 })} Marks)`;
        }}
        barColor="#6366f1"
        yLabel="Percentage (%)"
    />
);

const AverageTimeTakenChart = (props: { data: ChartDataType[] }) => (
    <ReusableBarChart
        data={props.data}
        title="Average Time Taken"
        dataKey="avgTime"
        yTickFormatter={(value) => TimeDisplayUtil.formatSeconds(value)}
        tooltipFormatter={(value, label) => {
            const { avgTime } = value;
            return TimeDisplayUtil.formatSeconds(avgTime);
        }}
        barColor="#00bc7d"
        yLabel="Time Taken"
    />
);

const PassRateChart = (props: { data: ChartDataType[] }) => (
    <ReusableBarChart
        data={props.data}
        title="Pass Rate"
        dataKey="passRate"
        yTickFormatter={(value) => `${NumberDisplayUtil.formatDecimal({ number: value, roundTo: 2 })}%`}
        tooltipFormatter={(value, label) => {
            const { passRate, passCount, totalUser } = value;
            return `${NumberDisplayUtil.formatDecimal({ number: passRate, roundTo: 2 })}% (${passCount}/${totalUser} Users)`;
        }}
        barColor="#fe9a00"
        yLabel="Pass Rate (%)"
    />
);

type CompareOverviewChartsProps = {
    overview: FormComparisonOverview;
};

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
        <div className="flex gap-4 justify-start flex-wrap border-t border-default">
            <AveragePercentageChart data={chartData} />
            <AverageTimeTakenChart data={chartData} />
            {overview.passRateChange && <PassRateChart data={chartData} />}
        </div>
    );
};

const commonTickStyle = {
    fontSize: 12,
    fill: getComputedStyle(document.documentElement).getPropertyValue('--color-content-secondary'),
};

const commonLabelStyle = {
    fontSize: 13,
    fill: getComputedStyle(document.documentElement).getPropertyValue('--color-content-secondary'),
};
