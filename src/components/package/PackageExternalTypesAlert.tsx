import React from 'react';
import { PackageLink } from '../common/PackageLink';

export function PackageExternalTypesAlert({
    definitelyTypedName,
}: {
    definitelyTypedName?: string;
}) {
    if (!definitelyTypedName) {
        return null;
    }

    return (
        <div className="flex justify-center p-4 border border-green-600 rounded">
            <p className="mt-0">
                Type definitions are available in the{' '}
                <PackageLink name={definitelyTypedName}>
                    <span className="font-bold hover:underline">
                        {definitelyTypedName}
                    </span>
                </PackageLink>{' '}
                package
            </p>
        </div>
    );
}
