import AppErrorView from "@/ui/widgets/error/AppErrorView";
import { useAdminFormCompareStore } from "./storeContext";
import Loader from "@/ui/widgets/loaders/Loader";
import { observer } from "mobx-react-lite";
import { useState } from "react";

// ✅ Exported section (No changes needed here)
const UserListSection = () => {
    return (
        <>
            <SectionHeader />
            <UserListView />
        </>
    );
};

export default UserListSection;

// ✅ Header with Search (Tailwind already applied effectively)
function SectionHeader() {
    const store = useAdminFormCompareStore();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
        // Assuming compareVm exists and has this method
        store.compareVm?.onSearchQueryChange(term);
    };

    return (
        // Using padding, flex layout, spacing, text styles from Tailwind
        <div className="p-4 pb-0">
            <div className="flex flex-col space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">User Comparison List</h2>
                <input
                    type="text"
                    placeholder="Search by name, email, or mobile"
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    // Input styling using Tailwind: width, padding, border, rounding, shadow, focus states
                    className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
    );
}

// ✅ Handles loading, error, or rendering content (Relies on internal Tailwind of child components)
const UserListView = observer(() => {
    const store = useAdminFormCompareStore();

    // Assumes AppErrorView uses Tailwind internally
    if (store.usersState.isError) {
        const e = store.usersState.error!;
        return (
            <AppErrorView
                message={e.message}
                description={e.description}
                actions={[]}
            />
        );
    }

    // Assumes MainContent uses Tailwind
    if (store.usersState.isSuccess) {
        return <MainContent />;
    }

    // Assumes Loader uses Tailwind internally
    return <Loader />;
});

// ✅ Main content table & pagination (Refined Tailwind for table)
function MainContent() {
    const store = useAdminFormCompareStore();
    // Add checks for data existence for robustness
    const users = store.usersState.data?.items ?? [];
    const pageInfo = store.usersState.data?.pageInfo ?? { page: 1, totalPages: 1, totalItems: 0 };
    const formALabel = store.usersState.data?.formALabel ?? "Form A";
    const formBLabel = store.usersState.data?.formBLabel ?? "Form B";

    const handlePageChange = (newPage: number) => {
        // Ensure compareVm exists before calling
        if (store.compareVm) {
            store.getUsersComparison({ vm: store.compareVm, page: newPage });
        }
    };

    return (
        // Padding applied
        <div className="p-4 pt-2">
            {/* Horizontal scroll for smaller screens */}
            <div className="overflow-x-auto">
                {/* Table styling: min-width, background, border, rounding, shadow */}
                <table className="min-w-full bg-white border border-gray-200 rounded shadow">
                    <thead>
                        {/* Table header styling: background, text alignment/size/weight/color */}
                        <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                            {/* Padding and border */}
                            <th className="px-4 py-2 border-b">User/Guest Info</th>
                            <th className="px-4 py-2 border-b">{formALabel} Marks</th>
                            <th className="px-4 py-2 border-b">{formBLabel} Marks</th>
                            <th className="px-4 py-2 border-b">{formALabel} Time (s)</th>
                            <th className="px-4 py-2 border-b">{formBLabel} Time (s)</th>
                        </tr>
                    </thead>
                    {/* Using divide utility for row borders */}
                    <tbody className="divide-y divide-gray-200">
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                // Row styling: text size/color, hover effect
                                <tr key={user.userTile?.id ?? `guest-${index}`} className="text-sm text-gray-800 hover:bg-gray-50">
                                    {/* User Info Cell: Padding */}
                                    <td className="px-4 py-3">
                                        {user.userTile ? (
                                            // Spacing for user details
                                            <div className="space-y-1">
                                                {/* Using font-bold for labels */}
                                                <div><strong className="font-medium text-gray-600">Name:</strong> {user.userTile.name}</div>
                                                <div><strong className="font-medium text-gray-600">Email:</strong> {user.userTile.email}</div>
                                                <div><strong className="font-medium text-gray-600">Mobile:</strong> {user.userTile.mobile || "N/A"}</div>
                                                <div><strong className="font-medium text-gray-600">Email Verified:</strong> {user.userTile.emailVerified ? "Yes" : "No"}</div>
                                            </div>
                                        ) : (
                                            // Styling for guest indicator
                                            <span className="italic text-gray-500">Guest</span>
                                        )}
                                    </td>
                                    {/* Data Cells: Padding, prevent wrapping */}
                                    <td className="px-4 py-3 whitespace-nowrap">{user.formAMarks ?? "N/A"}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">{user.formBMarks ?? "N/A"}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">{user.formATimeTaken ?? "N/A"}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">{user.formBTimeTaken ?? "N/A"}</td>
                                </tr>
                            ))
                        ) : (
                            // Row shown when there are no users
                            <tr>
                                <td colSpan={5} className="text-center text-gray-500 py-4 px-4">
                                    No users found matching your criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination: Margin, flex layout, alignment, text style */}
            {pageInfo.totalPages > 1 && ( // Only show pagination if needed
                 <div className="mt-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-700 space-y-2 sm:space-y-0">
                    <span>
                        Page <strong>{pageInfo.page}</strong> of <strong>{pageInfo.totalPages}</strong> | Total Items: {pageInfo.totalItems}
                    </span>
                    {/* Spacing between buttons */}
                    <div className="space-x-2">
                        {/* Button styling: Padding, rounding, conditional background/text/cursor based on disabled state, hover effect */}
                        <button
                            onClick={() => handlePageChange(pageInfo.page - 1)}
                            disabled={pageInfo.page <= 1} // More robust check
                            className={`px-3 py-1 rounded ${pageInfo.page <= 1
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed" // Slightly adjusted disabled style
                                : "bg-blue-500 text-white hover:bg-blue-600"
                                }`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => handlePageChange(pageInfo.page + 1)}
                            disabled={pageInfo.page >= pageInfo.totalPages} // More robust check
                            className={`px-3 py-1 rounded ${pageInfo.page >= pageInfo.totalPages
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed" // Slightly adjusted disabled style
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
}