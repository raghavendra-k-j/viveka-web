import AppErrorView from "@/ui/widgets/error/AppErrorView";
import { Loader } from "@/ui/widgets/loaders/Loader";
import { useAdminFormCompareStore } from "../storeCtx";
import { observer } from "mobx-react-lite";
import { FormCompareUserItem } from "@/domain/models/admin/forms/compare/FormCompareUserItem";
import { TimeDisplayUtil } from "@/domain/utils/TimeDisplayUtil";
import { NumberDisplayUtil } from "@/domain/utils/NumberDisplayUtil";
import { CompareSectionCard, CompareSectionCardTitle } from "./SectionCard";
import { SearchInput } from "@/ui/widgets/inputs/SearchInput";
import { AvatarColorUtil } from "@/domain/utils/AvatarColorUtil";
import { useEffect } from "react";

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
            <UserListView />
        </CompareSectionCard>
    );
};

export default UserListSection;

// 🔹 Title and Search Bar
const SectionHeader = () => {
    const store = useAdminFormCompareStore();

    return (
        <div className="flex flex-row justify-between items-center gap-3 px-3 py-2 border-b border-gray-200">
            <CompareSectionCardTitle>User-wise Metrics</CompareSectionCardTitle>
            <div>
                <SearchInput
                    inputSize="small"
                    placeholder="Search by name, email or mobile number"
                    onChange={(e) => store.compareStore?.onSearchQueryChange(e.target.value)}
                    value={store.compareStore?.searchQuery ?? ""}
                    style={{ width: "350px" }}
                />
            </div>
        </div>
    );
};

// 🔹 Handles data state
const UserListView = observer(() => {
    const store = useAdminFormCompareStore();

    if (store.usersState.isError) {
        const e = store.usersState.error!;
        return <AppErrorView message={e.message} description={e.description} actions={[]} />;
    }

    if (store.usersState.isSuccess) {
        return <MainContent />;
    }

    return (
        <Centered>
            <Loader />
        </Centered>
    );
});

function Centered({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col justify-center items-center min-h-[100px]">{children}</div>;
}


// 🔹 Main content section
const MainContent = () => {
    const store = useAdminFormCompareStore();
    const users = store.usersState.data?.items ?? [];
    const pageInfo = store.usersState.data?.pageInfo ?? { page: 1, totalPages: 1, totalItems: 0 };
    const formALabel = store.usersState.data?.formALabel ?? "Form A";
    const formBLabel = store.usersState.data?.formBLabel ?? "Form B";

    const handlePageChange = (newPage: number) => {
        if (store.compareStore) {
            store.getComparisonUserList({ page: newPage });
        }
    };

    return (
        <div>
            <div className="overflow-x-auto border border-gray-200 rounded-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100 border-b border-gray-300">
                        {/* First Row - Group Headers */}
                        <tr className="border-b border-gray-200">
                            <TableHeaderCell align="right" className=""> </TableHeaderCell>
                            <TableHeaderCell align="center" colSpan={2}>Marks</TableHeaderCell>
                            <TableHeaderCell align="center" colSpan={2}>Result</TableHeaderCell>
                            <TableHeaderCell align="center" colSpan={2}>Time Taken</TableHeaderCell>
                        </tr>
                        {/* Second Row - Sub Columns */}
                        <tr className="border-b border-gray-200">
                            <TableHeaderCell>User</TableHeaderCell>
                            <TableHeaderCell align="right">{formALabel}</TableHeaderCell>
                            <TableHeaderCell align="right">{formBLabel}</TableHeaderCell>
                            <TableHeaderCell align="center">{formALabel}</TableHeaderCell>
                            <TableHeaderCell align="center">{formBLabel}</TableHeaderCell>
                            <TableHeaderCell align="right">{formALabel}</TableHeaderCell>
                            <TableHeaderCell align="right">{formBLabel}</TableHeaderCell>
                        </tr>
                    </thead>




                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <UserRow key={user.userTile?.id ?? `guest-${index}`} item={user} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center text-gray-500 py-4 px-4">
                                    No users found matching your criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {
                pageInfo.totalPages > 1 && (
                    <div className="mt-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-700 gap-2">
                        <span>
                            Page <strong>{pageInfo.page}</strong> of <strong>{pageInfo.totalPages}</strong> | Total Items: {pageInfo.totalItems}
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handlePageChange(pageInfo.page - 1)}
                                disabled={pageInfo.page <= 1}
                                className={`px-3 py-1 rounded-sm text-sm transition ${pageInfo.page <= 1
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : "bg-blue-500 text-white hover:bg-blue-600"
                                    }`}
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => handlePageChange(pageInfo.page + 1)}
                                disabled={pageInfo.page >= pageInfo.totalPages}
                                className={`px-3 py-1 rounded-sm text-sm transition ${pageInfo.page >= pageInfo.totalPages
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : "bg-blue-500 text-white hover:bg-blue-600"
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )
            }
        </div >
    );

};

const UserRow = ({ item }: { item: FormCompareUserItem }) => {

    const renderStatusBadge = (passed?: boolean) => {
        if (passed === true) {
            return <span className="fs-sm fw-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Pass</span>;
        } else if (passed === false) {
            return <span className="fs-sm fw-medium text-red-700 bg-red-100 px-2 py-0.5 rounded-full">Fail</span>;
        } else {
            return <span className="fs-sm fw-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">N/A</span>;
        }
    };

    return (
        <tr className="hover:bg-gray-50">
            <TableDataCell><UserTileItem user={item.userTile ?? item.guestTile!} /></TableDataCell>
            <TableDataCell align="right">
                {NumberDisplayUtil.formatDecimal({ number: item.formAMarks, roundTo: 2 })}
            </TableDataCell>
            <TableDataCell align="right">
                {NumberDisplayUtil.formatDecimal({ number: item.formBMarks, roundTo: 2 })}
            </TableDataCell>
            <TableDataCell align="center">{renderStatusBadge(item.formAPassed)}</TableDataCell>
            <TableDataCell align="center">{renderStatusBadge(item.formBPassed)}</TableDataCell>
            <TableDataCell align="right">
                {TimeDisplayUtil.formatSeconds(item.formATimeTaken)}
            </TableDataCell>
            <TableDataCell align="right">
                {TimeDisplayUtil.formatSeconds(item.formBTimeTaken)}
            </TableDataCell>
        </tr>

    );
};






const UserTileItem = ({ user }: { user: { name: string; email: string } }) => {
    // Generate a consistent random color class from the user's name
    const colors = AvatarColorUtil.getAvatarColor(user.email);

    const initial = user.name?.[0]?.toUpperCase() ?? "?";

    return (
        <div className="flex items-center gap-3">
            {/* Avatar */}
            <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm`}
                style={{
                    backgroundColor: colors.bgColor,
                    color: colors.textColor,
                }}
            >
                {initial}
            </div>

            {/* User Details */}
            <div className="space-y-0.5">
                <div className="text-sm font-semibold text-gray-700">
                    {user.name}
                </div>
                <div className="text-xs text-gray-600">
                    {user.email}
                </div>
            </div>
        </div>
    );
};



const TableHeaderCell = ({
    children,
    align = "left",
    className = "",
    colSpan = 1,
}: {
    children: React.ReactNode;
    align?: "left" | "center" | "right";
    className?: string;
    colSpan?: number;
}) => {
    const alignClass = `text-${align}`;
    return (
        <th
            colSpan={colSpan}
            className={`px-4 py-2 text-xs font-semibold text-gray-600 uppercase whitespace-nowrap border-r border-gray-200 ${alignClass} ${className}`}
        >
            {children}
        </th>
    );
};



const TableDataCell = ({
    children,
    align = "left",
    className = "",
}: {
    children: React.ReactNode;
    align?: "left" | "center" | "right";
    className?: string;
}) => {
    const alignClass = `text-${align}`;
    return (
        <td
            className={`px-4 py-2.5 whitespace-nowrap text-sm text-gray-800 ${alignClass} ${className}`}
        >
            {children}
        </td>
    );
};
