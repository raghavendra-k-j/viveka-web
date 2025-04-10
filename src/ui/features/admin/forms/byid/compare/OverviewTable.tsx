import Loader from "@/ui/widgets/loaders/Loader";
import { useAdminFormCompareStore } from "./storeContext";
import AppErrorView from "@/ui/widgets/error/AppErrorView";
import { observer } from 'mobx-react-lite';

const CompareOverviewTable = () => {
    const store = useAdminFormCompareStore();

    if (store.overviewState.isError) {
        const e = store.overviewState.error!;
        return (
            <AppErrorView
                message={e.message}
                description={e.description}
                actions={[]}
            />
        );
    }

    if (store.overviewState.isSuccess) {
        return <Table />
    }

    return <Loader />;
}


export default observer(CompareOverviewTable);


function Table() {
    const store = useAdminFormCompareStore();
    const overview = store.overviewState.data!;

    return (
        <table>
            <thead>
                <tr>
                    <th>Metric</th>
                    <th>{overview.formALabel}</th>
                    <th>{overview.formBLabel}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Average Marks</td>
                    <td>{overview.formAAvgMarks}</td>
                    <td>{overview.formBAvgMarks}</td>
                </tr>
                <tr>
                    <td>Average Time</td>
                    <td>{overview.formAAvgTime}</td>
                    <td>{overview.formBAvgTime}</td>
                </tr>
                <tr>
                    <td>Pass Rate (%)</td>
                    <td>{overview.formAPassRate}</td>
                    <td>{overview.formBPassRate}</td>
                </tr>
                <tr>
                    <td>Total Responses</td>
                    <td>{overview.formATotalResponses}</td>
                    <td>{overview.formBTotalResponses}</td>
                </tr>
                <tr>
                    <td>Common Responses</td>
                    <td colSpan={2}>{overview.commonResponseCount}</td>
                </tr>
            </tbody>
        </table>
    );
}