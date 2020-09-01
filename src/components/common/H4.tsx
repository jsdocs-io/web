import React from 'react';

export function H4({
    className = '',
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <h4 className={`${className} my-2 text-lg font-bold`.trim()}>
            {children}
        </h4>
    );
}
