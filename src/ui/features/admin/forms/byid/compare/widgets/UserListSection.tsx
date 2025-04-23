import { useAdminFormCompareStore } from "../storeCtx";
import { CompareSectionCard, CompareSectionCardTitle } from "./SectionCard";
import { SearchInput } from "@/ui/widgets/inputs/SearchInput";
import { useEffect } from "react";
import UsersListTable from "./UsersListTable";
import { observer } from "mobx-react-lite";
import { CheckIcon, MoreVertical, X } from "lucide-react";
import { OutlinedButton } from "@/ui/widgets/buttons/OutlinedButton";

import * as React from "react";
import { Popover } from "radix-ui";
import popoverStyle from "@/app/css/components/popover.module.scss"
import checkboxStyle from "@/app/css/components/checkbox.module.scss"
import Checkbox from "@/ui/widgets/inputs/Checkbox";

const UserListSection = () => {
    const store = useAdminFormCompareStore();

    useEffect(() => {
        if (store.compareStore) {
            store.getComparisonUserList({ page: 1 });
        }
    }, [store.compareStore]);

    return (
        <CompareSectionCard>
            <SectionHeader />
            <UsersListTable />
        </CompareSectionCard>
    );
};

export default UserListSection;

const SectionHeader = () => {
    const store = useAdminFormCompareStore();

    return (
        <div className="flex flex-row justify-between items-center gap-3 px-3 py-2 bg-section-header">
            <CompareSectionCardTitle>User-wise Metrics</CompareSectionCardTitle>
            <div className="flex items-center space-x-2">
                <SearchInputField store={store} />
                <TableOptions />
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
            className="w-[400px]"
        />
    );
});

const TableOptions = () => {
    const store = useAdminFormCompareStore();
    const { userTableOptions } = store;

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <OutlinedButton size="sm"><MoreVertical size={16} /></OutlinedButton>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className={popoverStyle.Content} sideOffset={5}>
                    <div className="px-4 py-3 w-[240px]">
                        <div className="flex space-x-3 items-center justify-between">
                            <div className="text-content-primary fs-md font-bold">
                                Table Options
                            </div>
                            <Popover.Close aria-label="Close">
                                <OutlinedButton as="div" size="xs"><X size={16} /></OutlinedButton>
                            </Popover.Close>
                        </div>
                        <div className="flex flex-col space-y-4 mt-2">
                            <CheckBoxMenuItem
                                checked={() => userTableOptions.showPassStatusColumn}
                                onChange={(value: boolean) => userTableOptions.setShowPassStatusColumn(value)}
                                label="Show Pass Status"
                            />
                            <CheckBoxMenuItem
                                checked={() => userTableOptions.showTimeTakenColumn}
                                onChange={(value: boolean) => userTableOptions.setShowTimeTakenColumn(value)}
                                label="Show Time Taken"
                            />
                        </div>
                    </div>
                    <Popover.Arrow className={popoverStyle.Arrow} />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};

type CheckBoxMenuItemProps = {
    label: string;
    onChange: (value: boolean) => void;
    checked: () => boolean;
}

const CheckBoxMenuItem = observer((props: CheckBoxMenuItemProps) => {
    return (
        <Checkbox
            label={props.label}
            checked={props.checked()}
            onChange={props.onChange}
            size="sm"
        />
    );
});

