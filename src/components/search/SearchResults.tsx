import { SearchResult } from 'query-registry';
import React from 'react';
import { TimeAgo } from '../../components/common/TimeAgo';
import { A } from '../common/A';
import { PackageLink } from '../common/PackageLink';

export default function SearchResults({
    searchResults,
}: {
    searchResults?: SearchResult[];
}) {
    if (!searchResults) {
        return (
            <p className="mt-0 text-2xl font-bold text-center animate-pulse">
                Loading...
            </p>
        );
    }

    const packages = searchResults.map(({ package: pkg }) => pkg);
    if (!packages.length) {
        return (
            <p className="mt-0 text-2xl font-bold text-center">
                No search results
            </p>
        );
    }

    return (
        <div className="space-y-12">
            {packages.map(
                ({
                    name,
                    version,
                    description,
                    date,
                    publisher: { username },
                }) => (
                    <div key={name}>
                        <PackageLink
                            name={name}
                            version={version}
                            title={`${name}@${version}`}
                        >
                            <span className="text-xl font-bold break-words hover:underline">
                                {name}
                            </span>
                        </PackageLink>

                        {description && (
                            <p className="break-words">{description}</p>
                        )}

                        <p>
                            Version <span className="font-bold">{version}</span>{' '}
                            published <TimeAgo date={date} />
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
        </div>
    );
}
