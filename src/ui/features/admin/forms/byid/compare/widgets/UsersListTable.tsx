import { observer } from "mobx-react-lite";
import AppErrorView from "@/ui/widgets/error/AppErrorView";
import { Loader } from "@/ui/widgets/loaders/Loader";
import { FilledButton } from "@/ui/widgets/buttons/FilledButton";
import { Pagination } from "@/app/theme/Pagination";
import { useAdminFormCompareStore } from "../storeCtx";
import { NumberDisplayUtil } from "@/domain/utils/NumberDisplayUtil";
import { TimeDisplayUtil } from "@/domain/utils/TimeDisplayUtil";
import { UserTileItem } from "./UserRow";
import { FormCompareDetailsVm, FormCompareUserItemVm } from "../Models";
import { MoveUp, MoveDown } from "lucide-react";
import { ReactNode } from "react";



const UsersListTable = observer(() => {
    const store = useAdminFormCompareStore();

    if (store.usersState.isError) {
        return <TableErrorView />;
    }

    if (!store.usersState.isSuccess) {
        return <CenteredLoader />;
    }

    return <UsersTableContent />;
});

export default UsersListTable;



const UsersTableContent = observer(() => {
    const store = useAdminFormCompareStore();
    const { compareFormDetails, userTableOptions, usersData } = store;
    const { formALabel, formBLabel } = compareFormDetails;
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
                <table className="min-w-full table table-bordered-h">
                    <TableHeader formALabel={formALabel} formBLabel={formBLabel} options={userTableOptions} />
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <UserRow
                                    key={user.base.participantKey}
                                    item={user}
                                    compareFormDetails={compareFormDetails}
                                    showStatus={userTableOptions.showPassStatusColumn}
                                    showTime={userTableOptions.showTimeTakenColumn}
                                />
                            ))
                        ) : (
                            <TableEmptyRow colSpan={7} />
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
});



const TableHeader = ({
    formALabel,
    formBLabel,
    options,
}: {
    formALabel: string;
    formBLabel: string;
    options: { showPassStatusColumn: boolean; showTimeTakenColumn: boolean };
}) => (
    <thead className="table-head table-header-bordered">
        <tr>
            <TableHeaderCell rowSpan={2}>User</TableHeaderCell>
            <TableHeaderCell align="center" colSpan={3}>Marks</TableHeaderCell>
            {options.showPassStatusColumn && <TableHeaderCell align="center" colSpan={2}>Result</TableHeaderCell>}
            {options.showTimeTakenColumn && <TableHeaderCell align="center" colSpan={3}>Time Taken</TableHeaderCell>}
        </tr>
        <tr>
            <TableHeaderCell>{formALabel}</TableHeaderCell>
            <TableHeaderCell>{formBLabel}</TableHeaderCell>
            <TableHeaderCell>Change</TableHeaderCell>
            {options.showPassStatusColumn && (
                <>
                    <TableHeaderCell>{formALabel}</TableHeaderCell>
                    <TableHeaderCell>{formBLabel}</TableHeaderCell>
                </>
            )}
            {options.showTimeTakenColumn && (
                <>
                    <TableHeaderCell>{formALabel}</TableHeaderCell>
                    <TableHeaderCell>{formBLabel}</TableHeaderCell>
                    <TableHeaderCell>Change</TableHeaderCell>
                </>
            )}
        </tr>
    </thead>
);



const UserRow = ({
    item,
    compareFormDetails,
    showStatus,
    showTime,
}: {
    item: FormCompareUserItemVm;
    compareFormDetails: FormCompareDetailsVm;
    showStatus: boolean;
    showTime: boolean;
}) => {
    const renderStatusBadge = (passed?: boolean) => {
        if (passed === true) {
            return <StatusBadge text="Pass" color="green" />;
        } else if (passed === false) {
            return <StatusBadge text="Fail" color="red" />;
        } else {
            return <StatusBadge text="N/A" color="gray" />;
        }
    };

    const renderMarksChange = () => {
        let changeText: string;
        let iconClassName: string;
        let iconElement: ReactNode;

        let formattedPercentage = NumberDisplayUtil.formatDecimal({ number: Math.abs(item.base.percentageChange.value), roundTo: 2 });
        let marksChange = NumberDisplayUtil.formatDecimal({ number: Math.abs(item.marksChange.value), roundTo: 2 });
        if (item.marksChange.isIncrease) {
            changeText = compareFormDetails.isSameTotalMarks ? `${formattedPercentage}% (+${marksChange})` : `${formattedPercentage}%`;
            iconClassName = "text-emerald-600";
            iconElement = <MoveUp size={14} className="inline ml-1" />;
        } else if (item.marksChange.isDecrease) {
            changeText = compareFormDetails.isSameTotalMarks ? `${formattedPercentage}% (-${marksChange})` : `${formattedPercentage}%`;
            iconClassName = "text-red-600";
            iconElement = <MoveDown size={14} className="inline ml-1" />;
        } else {
            changeText = "No Change";
            iconClassName = "text-content-primary";
            iconElement = null;
        }

        return (
            <span className={`fs-md-m text-content-primary`}>
                {changeText}
                <span className={iconClassName}>{iconElement}</span>
            </span>
        );
    };

    return (
        <tr>
            <TableDataCell>
                <UserTileItem user={item.base.userTile ?? item.base.guestTile!} />
            </TableDataCell>
            <TableDataCell>
                {formatMarksColumn(
                    item.base.formA.percentage,
                    item.base.formA.marks,
                    compareFormDetails.formA.totalMarks
                )}
            </TableDataCell>

            <TableDataCell>
                {formatMarksColumn(
                    item.base.formB.percentage,
                    item.base.formB.marks,
                    compareFormDetails.formB.totalMarks
                )}
            </TableDataCell>
            <TableDataCell>
                {renderMarksChange()}
            </TableDataCell>
            {showStatus && (
                <>
                    <TableDataCell align="center">{renderStatusBadge(item.base.formA.passed)}</TableDataCell>
                    <TableDataCell align="center">{renderStatusBadge(item.base.formB.passed)}</TableDataCell>
                </>
            )}
            {showTime && (
                <>
                    <TableDataCell>{TimeDisplayUtil.formatSeconds(item.base.formA.timeTaken)}</TableDataCell>
                    <TableDataCell>{TimeDisplayUtil.formatSeconds(item.base.formB.timeTaken)}</TableDataCell>
                    <TableDataCell>
                        {TimeDisplayUtil.formatSeconds(Math.abs(item.base.timeTakenChange.value))}
                        {item.base.timeTakenChange.isIncrease ? (
                            <span className="inline ml-1 text-red-600">Slower</span>
                        ) : item.base.timeTakenChange.isDecrease ? (
                            <span className="inline ml-1 text-emerald-600">Faster</span>
                        ) : item.base.timeTakenChange.isNoChange ? (
                            <span className="inline ml-1 text-gray-600">No Change</span>
                        ) : null}
                    </TableDataCell>
                </>
            )}
        </tr>
    );
};



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
}) => (
    <th colSpan={colSpan} rowSpan={rowSpan}
        className={`px-4 py-2 text-xs font-semibold text-content-primary uppercase whitespace-nowrap text-${align} ${className}`}>
        {children}
    </th>
);

const TableDataCell = ({
    children,
    align = "left",
    className = "",
}: {
    children: React.ReactNode;
    align?: "left" | "center" | "right";
    className?: string;
}) => (
    <td className={`px-4 py-2.5 whitespace-nowrap fs-md-m text-content-primary text-${align} ${className}`}>
        {children}
    </td>
);

const StatusBadge = ({ text, color }: { text: string; color: "green" | "red" | "gray" }) => {
    const colorMap = {
        green: "text-emerald-700 bg-emerald-50",
        red: "text-red-700 bg-red-50",
        gray: "text-content-primary",
    };
    return (
        <span className={`fs-md-m font-medium px-2 py-0.5 rounded-full ${colorMap[color]}`}>
            {text}
        </span>
    );
};

const TableEmptyRow = ({ colSpan }: { colSpan: number }) => (
    <tr>
        <td colSpan={colSpan} className="text-center fs-md text-content-primary py-4 px-4">
            No users found matching your criteria.
        </td>
    </tr>
);

const TableErrorView = () => {
    const store = useAdminFormCompareStore();
    const e = store.usersState.error!;
    return (
        <AppErrorView
            className="p-6"
            message={e.message}
            description={e.description}
            actions={[
                <FilledButton key="retry" onClick={() => store.getComparisonUserList({})}>
                    Retry
                </FilledButton>,
            ]}
        />
    );
};

const CenteredLoader = () => (
    <div className="flex flex-col justify-center items-center min-h-[200px]">
        <Loader />
    </div>
);



const formatMarksColumn = (
    percentage: number,
    marks: number,
    totalMarks: number
): string => {
    return `${NumberDisplayUtil.formatDecimal({ number: percentage, roundTo: 2 })} % 
(${NumberDisplayUtil.formatDecimal({ number: marks, roundTo: 2 })}/${NumberDisplayUtil.formatDecimal({ number: totalMarks, roundTo: 2 })})`;
};

