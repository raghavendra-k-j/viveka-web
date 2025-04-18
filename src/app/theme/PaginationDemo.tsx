import React, { useState } from "react";
import { Pagination } from "./Pagination";

export default function PaginationDemo() {
    const [page, setPage] = useState(1);
    const totalPages = 10;

    const handleNext = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    const handleFirst = () => setPage(1);
    const handleLast = () => setPage(totalPages);

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-xl font-semibold">Pagination Demo</h2>

            <div className="flex justify-center">
                <Pagination
                    size="xs"
                    currentPage={page}
                    totalPages={totalPages}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    onFirst={handleFirst}
                    onLast={handleLast}
                />
            </div>

            <div className="flex justify-center">
                <Pagination
                    size="sm"
                    currentPage={page}
                    totalPages={totalPages}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    onFirst={handleFirst}
                    onLast={handleLast}
                />
            </div>

            <div className="flex justify-center">
                <Pagination
                    size="md"
                    currentPage={page}
                    totalPages={totalPages}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    onFirst={handleFirst}
                    onLast={handleLast}
                />
            </div>

            <div className="flex justify-center">
                <Pagination
                    size="lg"
                    currentPage={page}
                    totalPages={totalPages}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    onFirst={handleFirst}
                    onLast={handleLast}
                />
            </div>

            <p className="text-center text-sm text-content-secondary">
                Current Page: {page}
            </p>
        </div>
    );
}
