import { OutlinedButton } from "@/ui/widgets/buttons/OutlinedButton";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

type DialogPaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export const DialogPagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: DialogPaginationProps) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = (): (number | "...")[] => {
        const pages: (number | "...")[] = [];
        const range = 1;

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage > 2) pages.push(1);
            if (currentPage > 3) pages.push("...");

            for (
                let i = Math.max(1, currentPage - range);
                i <= Math.min(totalPages, currentPage + range);
                i++
            ) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) pages.push("...");
            if (currentPage < totalPages - 1) pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex justify-center items-center px-4 py-3 gap-2 border-t border-dialog-divider text-sm">
            <OutlinedButton
                disabled={currentPage === 1}
                onClick={() => onPageChange(1)}
                aria-label="First page"
            >
                <ChevronsLeft className="w-4 h-4" />
            </OutlinedButton>

            <OutlinedButton
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                aria-label="Previous page"
            >
                <ChevronLeft className="w-4 h-4" />
            </OutlinedButton>

            {getPageNumbers().map((page, index) =>
                typeof page === "number" ? (
                    <button
                        key={index}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 rounded-md transition ${currentPage === page
                                ? "bg-primary text-on-primary font-semibold"
                                : "text-content-secondary hover:bg-muted"
                            }`}
                        aria-current={currentPage === page ? "page" : undefined}
                    >
                        {page}
                    </button>
                ) : (
                    <span
                        key={index}
                        className="px-2 text-gray-400 select-none"
                    >
                        …
                    </span>
                )
            )}

            <OutlinedButton
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                aria-label="Next page"
            >
                <ChevronRight className="w-4 h-4" />
            </OutlinedButton>

            <OutlinedButton
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(totalPages)}
                aria-label="Last page"
            >
                <ChevronsRight className="w-4 h-4" />
            </OutlinedButton>
        </div>
    );
};
