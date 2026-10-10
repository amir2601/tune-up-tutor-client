import React from 'react';

/** Reusable page header for dashboard views. */
const SectionHeader = ({ title, subtitle, action }) => (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <header className="space-y-1">
            <h2 className="text-2xl font-extrabold tracking-tight">{title}</h2>
            {subtitle && <p className="text-sm text-base-content/60">{subtitle}</p>}
        </header>
        {action}
    </div>
);

export default SectionHeader;
