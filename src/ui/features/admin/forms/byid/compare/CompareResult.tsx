import OverviewTable from "./OverviewTable";
import UserListSection from "./UserListSection";

export default function CompareResultTab() {
    return (<div className="flex flex-col w-full h-full p-4 space-y-4">
        <OverviewTable />
        <UserListSection />
    </div>);
}