import CompareOverviewSection from "./OverviewTable";
import UserListSection from "./UserListSection";

export default function CompareResultTab() {
    return (<div className="flex flex-col p-4 space-y-4">
        <CompareOverviewSection />
        <UserListSection />
    </div>);
}