import React from 'react';

/** Friendly empty state with an emoji icon, copy and optional action. */
const EmptyState = ({ icon = '🎵', title, text, action }) => (
    <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-3xl bg-primary/10 text-3xl">{icon}</span>
        <p className="text-lg font-bold">{title}</p>
        {text && <p className="max-w-sm text-sm text-base-content/60">{text}</p>}
        {action}
    </div>
);

export default EmptyState;
