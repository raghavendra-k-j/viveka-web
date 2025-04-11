import AppErrorView from "@/ui/widgets/error/AppErrorView";
import Loader from "@/ui/widgets/loaders/Loader";
import { useAdminFormCompareStore } from "./storeContext";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { UserAssessmentCompareItem } from "@/domain/models/admin/forms/compare/UserAssessmentCompareItem";
import { TimeDisplayUtil } from "@/domain/utils/TimeDisplayUtil";
import { NumberDisplayUtil } from "@/domain/utils/NumberDisplayUtil";

const UserListSection = () => {
    return (
        <div className="border border-gray-200 rounded-sm bg-white shadow-sm">
            <SectionHeader />
            <UserListView />
        </div>
    );
};

export default UserListSection;

// 🔹 Title and Search Bar
const SectionHeader = () => {
    const store = useAdminFormCompareStore();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
        store.compareVm?.onSearchQueryChange(term);
    };

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-3 py-2 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-800">User-wise Metrics</h2>
            <input
                type="text"
                placeholder="Search by name, email, or mobile"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full sm:w-[300px] px-2 py-1 text-sm border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
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

    return <Loader />;
});

// 🔹 Main content section
const MainContent = () => {
    const store = useAdminFormCompareStore();
    const users = store.usersState.data?.items ?? [];
    const pageInfo = store.usersState.data?.pageInfo ?? { page: 1, totalPages: 1, totalItems: 0 };
    const formALabel = store.usersState.data?.formALabel ?? "Form A";
    const formBLabel = store.usersState.data?.formBLabel ?? "Form B";

    const handlePageChange = (newPage: number) => {
        if (store.compareVm) {
            store.getUsersComparison({ vm: store.compareVm, page: newPage });
        }
    };

    return (
        <div>
            <div className="overflow-x-auto border border-gray-200 rounded-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100 border-b border-gray-300">
                        {/* First Row - Group Headers */}
                        <tr className="border-b border-gray-200">
                            <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 uppercase whitespace-nowrap border-r border-gray-200">

                            </th>
                            <th
                                colSpan={2}
                                className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-200"
                            >
                                Marks
                            </th>
                            <th
                                colSpan={2}
                                className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-200"
                            >
                                Result
                            </th>
                            <th
                                colSpan={2}
                                className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase"
                            >
                                Time Taken
                            </th>
                        </tr>

                        {/* Second Row - Sub Columns */}
                        <tr className="border-b border-gray-200">

                            <th

                                className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase align-middle border-r border-gray-200"
                            >
                                User
                            </th>
                            <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 uppercase whitespace-nowrap border-r border-gray-200">
                                {formALabel}
                            </th>
                            <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 uppercase whitespace-nowrap border-r border-gray-200">
                                {formBLabel}
                            </th>
                            <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase whitespace-nowrap border-r border-gray-200">
                                {formALabel}
                            </th>
                            <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase whitespace-nowrap border-r border-gray-200">
                                {formBLabel}
                            </th>
                            <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 uppercase whitespace-nowrap border-r border-gray-200">
                                {formALabel}
                            </th>
                            <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">
                                {formBLabel}
                            </th>
                        </tr>
                    </thead>


                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <UserRow key={user.userTile?.id ?? `guest-${index}`} user={user} />
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
            {pageInfo.totalPages > 1 && (
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
            )}
        </div>
    );

};

const UserRow = ({ user }: { user: UserAssessmentCompareItem }) => {
    const renderStatusBadge = (passed?: boolean) => {
        if (passed === true) {
            return <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Pass</span>;
        } else if (passed === false) {
            return <span className="text-xs font-medium text-red-700 bg-red-100 px-2 py-0.5 rounded-full">Fail</span>;
        } else {
            return <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">–</span>;
        }
    };

    return (
        <tr className="text-sm text-gray-800 hover:bg-gray-50">
            {/* User column */}
            <td className="px-4 py-2.5 align-top">
                {user.userTile ? (
                    <UserTileItem user={user.userTile} />
                ) : (
                    <span className="italic text-gray-500">Guest</span>
                )}
            </td>

            {/* Marks: Form A and B */}
            <td className="px-4 py-2.5 text-right whitespace-nowrap">
                {NumberDisplayUtil.formatDecimal({ number: user.formAMarks, roundTo: 2 })}
            </td>
            <td className="px-4 py-2.5 text-right whitespace-nowrap">
                {NumberDisplayUtil.formatDecimal({ number: user.formBMarks, roundTo: 2 })}
            </td>

            {/* Result: Form A and B */}
            <td className="px-4 py-2.5 text-center whitespace-nowrap">
                {renderStatusBadge(user.formAPassed)}
            </td>
            <td className="px-4 py-2.5 text-center whitespace-nowrap">
                {renderStatusBadge(user.formBPassed)}
            </td>

            {/* Time Taken: Form A and B */}
            <td className="px-4 py-2.5 text-right whitespace-nowrap">
                {TimeDisplayUtil.formatSeconds(user.formATimeTaken)}
            </td>
            <td className="px-4 py-2.5 text-right whitespace-nowrap">
                {TimeDisplayUtil.formatSeconds(user.formBTimeTaken)}
            </td>
        </tr>
    );
};






const UserTileItem = ({ user }: { user: { name: string; email: string } }) => {
    // Generate a consistent random color class from the user's name
    const getColorClass = (name: string) => {
        const colors = [
            "bg-red-500",
            "bg-green-500",
            "bg-blue-500",
            "bg-yellow-500",
            "bg-indigo-500",
            "bg-pink-500",
            "bg-purple-500",
            "bg-teal-500",
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    const avatarColor = getColorClass(user.name);
    const initial = user.name?.[0]?.toUpperCase() ?? "?";

    return (
        <div className="flex items-center gap-3">
            {/* Avatar */}
            <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm ${avatarColor}`}
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
