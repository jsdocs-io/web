import React from 'react';
import { isValidLicense } from '../../lib/is-valid-license';

export function PackageLicenseAlert({ license }: { license?: string }) {
    if (isValidLicense({ license })) {
        return null;
    }

    return (
        <div className="flex justify-center p-4 border border-red-500 rounded">
            <p className="mt-0">
                API extraction from unlicensed or proprietary packages is not
                supported
            </p>
        </div>
    );
}
