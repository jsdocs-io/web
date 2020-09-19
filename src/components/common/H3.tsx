import React from 'react';

export function H3({
    id,
    children,
}: {
    id?: string;
    children: React.ReactNode;
}) {
    return (
        <h3 id={id} className="my-4 text-xl font-bold">
            {children}
        </h3>
    );
}
