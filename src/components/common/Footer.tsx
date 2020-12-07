import Link from 'next/link';
import React from 'react';
import { A } from './A';
import { InternalLink } from './InternalLink';

export function Footer() {
    return (
        <footer className="p-4 bg-gray-100 border-t border-gray-300 dark:bg-gray-900 dark:border-gray-700">
            <div className="md:flex md:items-center md:justify-between">
                <Link href="/">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                        className="flex items-center space-x-3"
                        title="jsDocs.io"
                    >
                        <img
                            className="h-8"
                            src="/logo.png"
                            alt="jsDocs.io logo"
                        />

                        <span className="text-2xl font-bold">jsDocs.io</span>
                    </a>
                </Link>

                <ul className="mt-4 space-y-1 md:mt-0 sm:flex sm:space-x-4 sm:space-y-0">
                    <li>
                        <InternalLink href="/about">About</InternalLink>
                    </li>

                    <li>
                        <InternalLink href="/credits">Credits</InternalLink>
                    </li>

                    <li>
                        <InternalLink href="/sponsor">Sponsor</InternalLink>
                    </li>

                    <li>
                        <InternalLink href="/privacy">
                            Privacy Policy
                        </InternalLink>
                    </li>

                    <li>
                        <A href="https://github.com/jsdocs-io/jsdocs-io/issues">
                            Report an Issue
                        </A>
                    </li>

                    <li>
                        <A href="https://github.com/jsdocs-io">GitHub</A>
                    </li>

                    <li>
                        <A href="https://twitter.com/jsDocs">Twitter</A>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
