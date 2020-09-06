import React from 'react';
import { Section } from '../common/Section';
import { TimeAgo } from '../common/TimeAgo';

export function PackagePageFooter({ createdAt }: { createdAt: string }) {
    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <Section>
            <hr className="border-gray-300 dark:border-gray-700" />

            <ul className="mt-4">
                <li>
                    Updated <TimeAgo date={createdAt} />.
                </li>

                <li>
                    <button
                        className="text-blue-700 dark:text-blue-300 hover:underline"
                        onClick={scrollToTop}
                    >
                        Back to top
                    </button>
                </li>
            </ul>
        </Section>
    );
}
