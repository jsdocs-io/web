import Head from 'next/head';
import React from 'react';
import { Layout } from '../components/common/Layout';
import { bronzeSponsors, goldSponsors, silverSponsors } from '../data/sponsors';

export default function SponsorPage() {
    const pageTitle = 'Sponsor - jsDocs.io';
    const pageDescription = 'Sponsors page - jsDocs.io';

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />

                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta
                    property="og:url"
                    content="https://www.jsdocs.io/sponsor"
                />

                <meta property="twitter:title" content={pageTitle} />
                <meta
                    property="twitter:description"
                    content={pageDescription}
                />
            </Head>

            <Layout>
                <article className="space-y-12">
                    <IntroSection />
                    <GoldSponsorsSection />
                    <SilverSponsorsSection />
                    <BronzeSponsorsSection />
                    <BackersSection />
                </article>
            </Layout>
        </>
    );
}

function IntroSection() {
    return (
        <section>
            <h1>Sponsor</h1>

            <p>Thank you for your interest in supporting jsDocs.io!</p>
        </section>
    );
}

function GoldSponsorsSection() {
    return (
        <section>
            <h2>Gold sponsors</h2>

            <ul className="flex flex-wrap items-center justify-center mt-4 rounded dark:bg-gray-300">
                {goldSponsors.map(({ name, url, logo }) => (
                    <li>
                        <a
                            className="flex items-center justify-center p-2 sm:p-4"
                            href={url}
                            title={name}
                        >
                            <img
                                className="object-contain w-48 h-24"
                                src={logo}
                                alt={`Logo for ${name}`}
                            />
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}

function SilverSponsorsSection() {
    return (
        <section>
            <h2>Silver sponsors</h2>

            <ul className="flex flex-wrap items-center justify-center mt-4 rounded dark:bg-gray-300">
                {silverSponsors.map(({ name, url, logo }) => (
                    <li>
                        <a
                            className="flex items-center justify-center p-2 sm:p-4"
                            href={url}
                            title={name}
                        >
                            <img
                                className="object-contain w-40 h-20"
                                src={logo}
                                alt={`Logo for ${name}`}
                            />
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}

function BronzeSponsorsSection() {
    return (
        <section>
            <h2>Bronze sponsors</h2>

            <ul className="flex flex-wrap items-center justify-center mt-4 rounded dark:bg-gray-300">
                {bronzeSponsors.map(({ name, url, logo }) => (
                    <li>
                        <a
                            className="flex items-center justify-center p-2 sm:p-4"
                            href={url}
                            title={name}
                        >
                            <img
                                className="object-contain w-32 h-16"
                                src={logo}
                                alt={`Logo for ${name}`}
                            />
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}

function BackersSection() {
    return (
        <section>
            <h2>Backers</h2>
        </section>
    );
}
