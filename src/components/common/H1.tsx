import React from 'react';

export function H1({ children }: { children: React.ReactNode }) {
    return <h1 className="mb-4 text-4xl font-bold">{children}</h1>;
}
