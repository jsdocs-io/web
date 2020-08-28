import React from 'react';

export function P({ children }: { children: React.ReactNode }) {
    return <p className="mt-1">{children}</p>;
}
