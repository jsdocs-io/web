import React from 'react';
import { InternalLink } from '../common/InternalLink';
import { TimeAgo } from '../common/TimeAgo';

export function PackagePageFooter({ createdAt }: { createdAt: string }) {
    return (
        <>
            <hr className="mt-8 border-gray-300 dark:border-gray-700" />

            <ul className="mt-4">
                <li>
                    Updated <TimeAgo date={createdAt} />.
                </li>

                <li>
                    <InternalLink href="#page-top">Back to top</InternalLink>
                </li>
            </ul>
        </>
    );
}
