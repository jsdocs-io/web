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
                        <PackageLink
                            name={name}
                            version={version}
                            title={`${name}@${version}`}
                        >
                            <span className="text-xl font-bold hover:underline">
                                {name}
                            </span>
                        </PackageLink>

                        {description && <p>{description}</p>}

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
        </>
    );
}
