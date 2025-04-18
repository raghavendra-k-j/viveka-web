import { OutlinedButton } from "@/ui/widgets/buttons/OutlinedButton";
import CompareOverviewSection from "./OverviewSection";
import { useAdminFormCompareStore } from "../storeCtx";
import { AdminFormCompareStore } from "../store";
import UserListSection from "./UserListSection";
import { observer } from "mobx-react-lite";

const CompareResultTab = observer(() => {
    const store = useAdminFormCompareStore();
    const { overviewState } = store;

    return (
        <div className="flex flex-col p-4 space-y-4">
            <Header />
            <CompareOverviewSection />
            {overviewState.isSuccess && <UserListSection />}
        </div>
    );
});

export default CompareResultTab;

function Header() {
    const store = useAdminFormCompareStore();
    return (
        <div className="flex flex-col space-y-2">
            <div className="flex flex-row items-center space-x-2">
                <OutlinedButton size="sm" onClick={() => store.onFormSelected(undefined)}>Back</OutlinedButton>
            </div>
            <UsersMatchInfoBanner store={store} />
        </div>
    );
}

function UsersMatchInfoBanner({ store }: { store: AdminFormCompareStore }) {
    return (<div className="flex flex-row items-start space-x-3 p-4 bg-gray-50 border border-gray-200 rounded-md">
        Note: The comparison is based on the users who have taken both forms. The data may not be fully representative of all users.
    </div>);
}
