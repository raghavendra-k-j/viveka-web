import { OutlinedButton } from "@/ui/widgets/buttons/OutlinedButton";
import CompareOverviewSection from "./OverviewSection";
import { useAdminFormCompareStore } from "../storeCtx";
import UserListSection from "./UserListSection";
import { observer } from "mobx-react-lite";
import { CompareHeader } from "./CompareHeader";

const CompareResultTab = observer(() => {
    const store = useAdminFormCompareStore();
    const { overviewState } = store;

    return (
        <div className="flex flex-col p-4 space-y-4">
            <Header />
            {overviewState.isSuccess && <CompareHeader/>}
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
        </div>
    );
}