import React from 'react';

/** Shimmering placeholder rows used while table data loads. */
const TableSkeleton = ({ rows = 5, cols = 5 }) => (
    <div className="surface overflow-hidden bg-base-100 p-4">
        <div className="mb-4 h-10 w-full animate-pulse rounded-xl bg-base-300/70" />
        <div className="space-y-3">
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex gap-4">
                    {Array.from({ length: cols }).map((_, j) => (
                        <div key={j} className="h-12 flex-1 animate-pulse rounded-xl bg-base-300" />
                    ))}
                </div>
            ))}
        </div>
    </div>
);

export default TableSkeleton;
