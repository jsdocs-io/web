import Link from 'next/link';
import { SearchResult } from 'query-registry';
import React from 'react';
import { TimeAgo } from '../../components/common/TimeAgo';

export default function SearchResults({
    searchResults,
}: {
    searchResults: SearchResult[];
}) {
    const packages = searchResults.map(({ package: pkg }) => pkg);

    return (
        <>
            {packages.map(
                ({
                    name,
                    version,
                    description,
                    date,
                    publisher: { username },
                }) => (
                    <div key={name} className="mt-6">
                        <Link
                            href="/package/[...slug]"
                            as={`/package/${name}/v/${version}`}
                            prefetch={false}
                        >
                            <a
                                className="text-xl font-bold text-blue-700 dark:text-blue-300 hover:underline"
                                title={`${name}@${version}`}
                            >
                                {name}
                            </a>
                        </Link>

                        {description && <p>{description}</p>}

                        <p>
                            Version <span className="font-mono">{version}</span>{' '}
                            published <TimeAgo date={date} />
                            {username && (
                                <span>
                                    {' '}
                                    by{' '}
                                    <a
                                        className="text-blue-700 dark:text-blue-300 hover:underline"
                                        href={`https://www.npmjs.com/~${username}`}
                                        title={`${username}'s npm profile page`}
                                    >
                                        {username}
                                    </a>
                                </span>
                            )}
                        </p>
                    </div>
                )
            )}
        </>
    );
}
