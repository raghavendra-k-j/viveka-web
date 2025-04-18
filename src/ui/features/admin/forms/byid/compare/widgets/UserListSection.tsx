import { useAdminFormCompareStore } from "../storeCtx";
import { CompareSectionCard, CompareSectionCardTitle } from "./SectionCard";
import { SearchInput } from "@/ui/widgets/inputs/SearchInput";
import { useEffect } from "react";
import UsersListTable from "./UsersListTable";
import { observer } from "mobx-react-lite";

const UserListSection = () => {
    const store = useAdminFormCompareStore();

    useEffect(() => {
        if (store.compareStore) {
            store.getComparisonUserList({ page: 1 });
        }
    }, [store.compareStore]);

    return (
        <CompareSectionCard className="">
            <SectionHeader />
            <UsersListTable />
        </CompareSectionCard>
    );
};

export default UserListSection;

const SectionHeader = () => {
    const store = useAdminFormCompareStore();

    return (
        <div className="flex flex-row justify-between items-center gap-3 px-3 py-2 border-b border-gray-200">
            <CompareSectionCardTitle>User-wise Metrics</CompareSectionCardTitle>
            <div>
                <SearchInputField store={store} />
            </div>
        </div>
    );
};

const SearchInputField = observer(({ store }: { store: ReturnType<typeof useAdminFormCompareStore> }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const setSearchQuery = (query: string) => {
        if (store.compareStore) {
            store.compareStore.onSearchQueryChange(query);
        }
    }

    return (
        <SearchInput
            inputSize="sm"
            placeholder="Search users by name, email or mobile number"
            onChange={handleChange}
            onClear={() => setSearchQuery("")}
            value={store.compareStore?.searchQuery ?? ""}
            style={{ width: "350px" }}
        />
    );
});