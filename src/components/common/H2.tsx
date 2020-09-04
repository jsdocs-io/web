import React from 'react';

export function H2({
    id,
    children,
}: {
    id?: string;
    children: React.ReactNode;
}) {
    return (
        <h2 id={id} className="my-4 text-2xl font-bold">
            {children}
        </h2>
    );
}
