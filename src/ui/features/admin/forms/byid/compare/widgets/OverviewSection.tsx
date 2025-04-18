import { Loader } from "@/ui/widgets/loaders/Loader";
import { useAdminFormCompareStore } from "../storeCtx";
import AppErrorView from "@/ui/widgets/error/AppErrorView";
import { observer } from 'mobx-react-lite';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { CompareSectionCard, CompareSectionCardTitle } from "./SectionCard";
import clsx from "clsx";
import { FilledButton } from "@/ui/widgets/buttons/FilledButton";
import { useEffect } from "react";
import { ComparisonOverviewTable } from "./OverviewTable";
import { CompareOverviewCharts } from "./OverviewChart";
import { motion } from "framer-motion";



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
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                        >
                            <CompareOverviewCharts overview={overview} />
                        </motion.div>
                    </TabPanel>
                    <TabPanel>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                        >
                            <ComparisonOverviewTable overview={overview} />
                        </motion.div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </CompareSectionCard>
    );
});


export default CompareOverviewSection;


type TabItemProps = {
    children: React.ReactNode;
};

export const TabItem = ({ children }: TabItemProps) => {
    return (
        <Tab
            className={({ selected }) =>
                clsx(
                    "px-4 py-1 border border-outlined rounded-sm fs-md cursor-pointer font-medium",
                    selected ? "bg-primary-subtle text-primary" : "bg-surface text-content-primary"
                )
            }
        >
            {children}
        </Tab>
    );
};
