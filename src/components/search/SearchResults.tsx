import Link from 'next/link';
import { SearchResult } from 'query-registry';
import React from 'react';
import { TimeAgo } from '../../components/common/TimeAgo';
import { A } from '../common/A';
import { InlineCode } from '../common/InlineCode';

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
                    <div key={name} className="mt-8">
                        <Link
                            href="/package/[...slug]"
                            as={`/package/${name}/v/${version}`}
                            prefetch={false}
                        >
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a
                                className="text-xl font-bold text-blue-700 dark:text-blue-300 hover:underline"
                                title={`${name}@${version}`}
                            >
                                {name}
                            </a>
                        </Link>

                        {description && <p>{description}</p>}

                        <p>
                            Version <InlineCode code={version} /> published{' '}
                            <TimeAgo date={date} />
                            {username && (
                                <>
                                    {' '}
                                    by{' '}
                                    <A
                                        href={`https://www.npmjs.com/~${username}`}
                                        title={`${username}'s npm profile page`}
                                    >
                                        {username}
                                    </A>
                                </>
                            )}
                        </p>
                    </div>
                )
            )}
        </>
    );
}
