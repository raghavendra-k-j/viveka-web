import { observer } from "mobx-react-lite";
import AppErrorView from "@/ui/widgets/error/AppErrorView";
import { Loader } from "@/ui/widgets/loaders/Loader";
import { FilledButton } from "@/ui/widgets/buttons/FilledButton";
import { Pagination } from "@/app/theme/Pagination";
import { useAdminFormCompareStore } from "../storeCtx";
import { NumberDisplayUtil } from "@/domain/utils/NumberDisplayUtil";
import { AvatarColorUtil } from "@/domain/utils/AvatarColorUtil";
import { FormCompareDetailsVm, FormCompareUserItemVm } from "../Models";


const UsersListTable = observer(() => {
    const store = useAdminFormCompareStore();

    if (store.usersState.isError) {
        const e = store.usersState.error!;
        return (
            <AppErrorView
                className="p-6"
                message={e.message}
                description={e.description}
                actions={[
                    <FilledButton key="retry" onClick={() => store.getComparisonUserList({})}>Retry</FilledButton>
                ]}
            />
        );
    }

    if (store.usersState.isSuccess) {
        return <MainContent />;
    }

    return (
        <UsersListCenteredContent>
            <Loader />
        </UsersListCenteredContent>
    );
});

export default UsersListTable;



const MainContent = () => {
    const store = useAdminFormCompareStore();
    const { compareFormDetails } = store;
    const { formALabel, formBLabel } = compareFormDetails;

    const usersData = store.usersData;
    const users = usersData.items;
    const pageInfo = usersData.pageInfo;

    const handlePageChange = (newPage: number) => {
        if (store.compareStore) {
            store.getComparisonUserList({ page: newPage });
        }
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full table table-bordered">
                    <thead className="table-head border-b border-light">
                        <tr className="border-b border-light">
                            <TableHeaderCell rowSpan={2}>User</TableHeaderCell>
                            <TableHeaderCell align="center" colSpan={3}>Marks</TableHeaderCell>
                            <TableHeaderCell align="center" colSpan={2}>Result</TableHeaderCell>
                        </tr>
                        <tr className="border-b border-light">
                            <TableHeaderCell>{formALabel}</TableHeaderCell>
                            <TableHeaderCell>{formBLabel}</TableHeaderCell>
                            <TableHeaderCell>Change</TableHeaderCell>
                            <TableHeaderCell>{formALabel}</TableHeaderCell>
                            <TableHeaderCell>{formBLabel}</TableHeaderCell>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <UserRow
                                    key={user.base.participantKey}
                                    item={user}
                                    compareFormDetails={compareFormDetails}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center text-gray-500 py-4 px-4">
                                    No users found matching your criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end px-3 py-2">
                <Pagination
                    currentPage={pageInfo.page}
                    totalPages={pageInfo.totalPages}
                    onNext={() => handlePageChange(pageInfo.page + 1)}
                    onPrev={() => handlePageChange(pageInfo.page - 1)}
                    onFirst={() => handlePageChange(1)}
                    onLast={() => handlePageChange(pageInfo.totalPages)}
                />
            </div>
        </div>
    );
};

// 4. User Row
const UserRow = ({ item, compareFormDetails }: { item: FormCompareUserItemVm, compareFormDetails: FormCompareDetailsVm }) => {
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
        <tr>
            <TableDataCell><UserTileItem user={item.base.userTile ?? item.base.guestTile!} /></TableDataCell>
            <TableDataCell align="right">
                {NumberDisplayUtil.formatDecimal({ number: item.base.formA.percentage, roundTo: 2 })} %
                ({NumberDisplayUtil.formatDecimal({ number: item.base.formA.marks, roundTo: 2 })}/{NumberDisplayUtil.formatDecimal({ number: compareFormDetails.formA.totalMarks, roundTo: 2 })})
            </TableDataCell>
            <TableDataCell align="right">
                {NumberDisplayUtil.formatDecimal({ number: item.base.formB.percentage, roundTo: 2 })} %
                ({NumberDisplayUtil.formatDecimal({ number: item.base.formB.marks, roundTo: 2 })}/{NumberDisplayUtil.formatDecimal({ number: compareFormDetails.formB.totalMarks, roundTo: 2 })})
            </TableDataCell>
            <TableDataCell align="right">
                {NumberDisplayUtil.formatDecimal({ number: item.base.formA.percentage - item.base.formB.percentage, roundTo: 2 })} %
            </TableDataCell>
            <TableDataCell align="center">{renderStatusBadge(item.base.formA.passed)}</TableDataCell>
            <TableDataCell align="center">{renderStatusBadge(item.base.formB.passed)}</TableDataCell>
        </tr>
    );
};

// 5. User Tile
const UserTileItem = ({ user }: { user: { name: string; email: string } }) => {
    const colors = AvatarColorUtil.getAvatarColor(user.email);
    const initial = user.name?.[0]?.toUpperCase() ?? "?";

    return (
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                style={{ backgroundColor: colors.bgColor, color: colors.textColor }}>
                {initial}
            </div>
            <div className="space-y-0.5">
                <div className="text-sm font-semibold text-gray-700">{user.name}</div>
                <div className="text-xs text-gray-600">{user.email}</div>
            </div>
        </div>
    );
};

// 6. Table Cell Components
const TableHeaderCell = ({
    children,
    align = "left",
    className = "",
    colSpan = 1,
    rowSpan = 1,
}: {
    children?: React.ReactNode;
    align?: "left" | "center" | "right";
    className?: string;
    colSpan?: number;
    rowSpan?: number;
}) => {
    const alignClass = `text-${align}`;
    return (
        <th colSpan={colSpan}
            rowSpan={rowSpan}
            className={`px-4 py-2 text-xs font-semibold text-content-primary uppercase whitespace-nowrap ${alignClass} ${className}`}>
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
        <td className={`px-4 py-2.5 whitespace-nowrap text-sm text-gray-800 ${alignClass} ${className}`}>
            {children}
        </td>
    );
};


const UsersListCenteredContent = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex flex-col justify-center items-center min-h-[200px]">{children}</div>;
};
