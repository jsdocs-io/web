import { SearchResult } from 'query-registry';
import React from 'react';
import { TimeAgo } from '../../components/common/TimeAgo';
import { A } from '../common/A';
import { PackageLink } from '../common/PackageLink';

export default function SearchResults({
    searchResults,
}: {
    searchResults: SearchResult[];
}) {
    const packages = searchResults.map(({ package: pkg }) => pkg);

    if (packages.length === 0) {
        return <h1 className="text-center">No search results</h1>;
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
