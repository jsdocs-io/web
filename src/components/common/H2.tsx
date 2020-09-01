import React from 'react';

export function H2({ children }: { children: React.ReactNode }) {
    return <h2 className="my-4 text-2xl font-bold">{children}</h2>;
}
