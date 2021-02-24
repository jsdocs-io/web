import React from 'react';
import { PackageLink } from '../common/PackageLink';

export function PackageExternalTypesAlert({
    definitelyTypedName,
}: {
    definitelyTypedName: string;
}) {
    return (
        <div className="flex justify-center p-4 border-2 border-green-600 rounded">
            <p className="mt-0 font-bold">
                Type definitions are available in the{' '}
                <PackageLink name={definitelyTypedName}>
                    {definitelyTypedName}
                </PackageLink>{' '}
                package
            </p>
        </div>
    );
}
