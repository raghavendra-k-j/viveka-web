import Loader from "@/ui/widgets/loaders/Loader";
import { useAdminFormCompareStore } from "./storeContext";
import AppErrorView from "@/ui/widgets/error/AppErrorView";
import { observer } from 'mobx-react-lite';
import { TimeDisplayUtil } from "@/domain/utils/TimeDisplayUtil";
import { NumberDisplayUtil } from "@/domain/utils/NumberDisplayUtil";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Label } from 'recharts';
import { FormComparisonOverviewRes } from "@/domain/models/admin/forms/compare/FormComparisonOverview";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';


const CompareOverviewSection = observer(() => {
    const store = useAdminFormCompareStore();
    const { overviewState } = store;

    if (overviewState.isLoading) return <Loader />;
    if (overviewState.isError) {
        const e = overviewState.error!;
        return <AppErrorView message={e.message} description={e.description} actions={[]} />;
    }

    const overview = overviewState.data;
    if (!overview) return <Loader />;

    return (
        <div className="border border-gray-200 rounded-sm space-y-4 bg-white shadow-sm">
            {/* Header: Title + Tabs */}
            <div>
                <TabGroup>
                    <div className="flex justify-between items-center px-3 py-2 border-b border-gray-200">
                        <h2 className="text-base font-semibold text-gray-800">Overall Comparison Summary</h2>
                        <TabList className="flex space-x-2">
                            <Tab className={({ selected }) =>
                                `px-3 py-1 border rounded text-sm ${selected ? "bg-gray-800 text-white" : "bg-white text-gray-600"
                                }`
                            }>
                                Table
                            </Tab>
                            <Tab className={({ selected }) =>
                                `px-3 py-1 border rounded text-sm ${selected ? "bg-gray-800 text-white" : "bg-white text-gray-600"
                                }`
                            }>
                                Charts
                            </Tab>
                        </TabList>
                    </div>
                    <TabPanels>
                        <TabPanel>
                            <StyledTable overview={overview} />
                        </TabPanel>
                        <TabPanel>
                            <CompareOverviewCharts overview={overview} />
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
        </div>
    );
});

export default CompareOverviewSection;


function StyledTable({ overview }: { overview: FormComparisonOverviewRes }) {
    return (
        <div className="overflow-hidden border border-gray-200 rounded-sm">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase max-w-[400px]">Metric</th>
                        <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">{overview.formALabel}</th>
                        <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">{overview.formBLabel}</th>
                        <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 uppercase">Change</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <ComparisonRow
                        label="Average Marks"
                        formAValue={overview.formAAvgMarks}
                        formBValue={overview.formBAvgMarks}
                        diff={overview.avgMarksDiff}
                        percentage={overview.avgMarksPercentageChange}
                    />
                    <ComparisonRow
                        label="Average Time Taken"
                        formAValue={TimeDisplayUtil.formatSeconds(overview.formAAvgTime)}
                        formBValue={TimeDisplayUtil.formatSeconds(overview.formBAvgTime)}
                        diff={overview.avgTimeDiff}
                        percentage={overview.avgTimePercentageChange}
                    />
                    <ComparisonRow
                        label="Pass Rate (%)"
                        formAValue={overview.formAPassRate ?? "-"}
                        formBValue={overview.formBPassRate ?? "-"}
                        diff={overview.passRateDiff}
                        percentage={overview.passRatePercentageChange}
                    />
                </tbody>
            </table>
        </div>
    );
}

type ComparisonRowProps = {
    label: string;
    formAValue: string | number;
    formBValue: string | number;
    diff?: number | null;
    percentage?: number | null;
};

const ComparisonRow = ({ label, formAValue, formBValue, diff, percentage }: ComparisonRowProps) => {
    const isValidNumber = (value: unknown): value is number => typeof value === 'number' && !isNaN(value);

    const isPositive = isValidNumber(diff) && diff > 0;
    const isNegative = isValidNumber(diff) && diff < 0;
    const colorClass = isPositive
        ? "text-green-600"
        : isNegative
            ? "text-red-600"
            : "text-gray-500";
    const sign = isPositive ? "+" : "";

    const showChange = isValidNumber(diff);

    return (
        <tr className="hover:bg-gray-50 transition-colors duration-150">
            <td className="px-6 py-2 text-sm font-medium text-gray-800">{label}</td>
            <td className="px-6 py-2 text-sm text-gray-600 text-right">{formAValue}</td>
            <td className="px-6 py-2 text-sm text-gray-600 text-right">{formBValue}</td>
            <td className="px-6 py-2 text-sm text-right">
                {showChange ? (
                    <div className={`text-sm ${colorClass}`}>
                        {`${sign}${NumberDisplayUtil.formatDecimal({ number: diff!, roundTo: 2 })}`}
                        {isValidNumber(percentage) && (
                            <span className="ml-1 align-middle text-xs">
                                ({`${sign}${NumberDisplayUtil.formatDecimal({ number: percentage!, roundTo: 2 })}%`})
                            </span>
                        )}
                    </div>
                ) : (
                    <span className="text-gray-400">-</span>
                )}
            </td>
        </tr>
    );
};


type CompareOverviewChartsProps = {
    overview: FormComparisonOverviewRes;
};

export const CompareOverviewCharts = ({ overview }: CompareOverviewChartsProps) => {
    const hasPassRate = overview.formAPassRate !== null && overview.formBPassRate !== null;

    const cardStyle = "p-4";
    const fixedCardLayout = "w-[300px] h-[300px]";

    const textStyle = { fontSize: '0.875rem', fill: '#4B5563' };

    const ChartCard = ({
        title,
        unit,
        data,
        yAxisLabel,
        color
    }: {
        title: string;
        unit?: string;
        data: any[];
        yAxisLabel?: string;
        color: string;
    }) => (
        <div className={`${cardStyle} ${fixedCardLayout}`}>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">{title}</h3>
            <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="form"
                            tickLine={false}
                            axisLine={false}
                            tick={textStyle}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={textStyle}
                        >
                            {yAxisLabel && (
                                <Label
                                    angle={-90}
                                    position="insideLeft"
                                    offset={10}
                                    style={{ ...textStyle, textAnchor: 'middle' }}
                                >
                                    {yAxisLabel}
                                </Label>
                            )}
                        </YAxis>
                        <Tooltip
                            wrapperStyle={{ fontSize: '0.875rem' }}
                            formatter={(value: any) => `${value}${unit ?? ""}`}
                            contentStyle={{ borderRadius: 4 }}
                        />
                        <Bar dataKey="value" fill={color} barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );

    const dataFor = (aVal: number | null, bVal: number | null) => [
        { form: overview.formALabel, value: aVal ?? 0 },
        { form: overview.formBLabel, value: bVal ?? 0 },
    ];

    return (
        <div className="flex gap-4 justify-start flex-wrap">
            <ChartCard
                title="Average Marks"
                color="#6366f1"
                data={dataFor(overview.formAAvgMarks, overview.formBAvgMarks)}
                yAxisLabel="Marks"
            />
            <ChartCard
                title="Average Time Taken"
                unit="s"
                color="#10b981"
                data={dataFor(overview.formAAvgTime, overview.formBAvgTime)}
                yAxisLabel="Time Taken"
            />
            {hasPassRate && (
                <ChartCard
                    title="Pass Rate (%)"
                    unit="%"
                    color="#f59e0b"
                    data={dataFor(overview.formAPassRate, overview.formBPassRate)}
                    yAxisLabel="Pass %"
                />
            )}
        </div>
    );
};
