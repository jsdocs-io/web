import React from 'react';

export function PackageMissingTypesAlert() {
    return (
        <div className="flex justify-center p-4 border-2 border-yellow-500 rounded">
            <p className="mt-0 font-bold">
                Unfortunately no type definitions are available for this package
            </p>
        </div>
    );
}
