import { ButtonSize } from "@/ui/widgets/buttons/ButtonSize";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    size?: ButtonSize;
    onNext: () => void;
    onPrev: () => void;
    onFirst: () => void;
    onLast: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    size = "xs",
    onNext,
    onPrev,
    onFirst,
    onLast,
}) => {
    return (
        <div className={`pagination pagination--${size}`}>
            <button
                className="pagination-btn first"
                onClick={onFirst}
                disabled={currentPage === 1}
            >
                <ChevronsLeft className="pagination-icon" />
            </button>
            <button
                className="pagination-btn"
                onClick={onPrev}
                disabled={currentPage === 1}
            >
                Prev
            </button>
            <span className="pagination-status">
                {currentPage} / {totalPages}
            </span>
            <button
                className="pagination-btn"
                onClick={onNext}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
            <button
                className="pagination-btn last"
                onClick={onLast}
                disabled={currentPage === totalPages}
            >
                <ChevronsRight className="pagination-icon" />
            </button>
        </div>
    );
};
