import Head from 'next/head';
import React from 'react';
import { A } from '../components/common/A';
import { Layout } from '../components/common/Layout';

export default function PrivacyPolicyPage() {
    const pageTitle = 'Privacy policy - jsDocs.io';
    const pageDescription = 'Privacy policy for jsDocs.io';

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />

                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta
                    property="og:url"
                    content="https://www.jsdocs.io/privacy"
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
                    <FirstPartySection />
                    <AnalyticsSection />
                    <HostingSection />
                    <LinksToExternalWebsitesSection />
                    <ContactInformationSection />
                </article>
            </Layout>
        </>
    );
}

function IntroSection() {
    return (
        <section>
            <h1>Privacy policy</h1>

            <p>This page contains the privacy policy for jsDocs.io.</p>

            <p>The privacy policy was last updated on October 27, 2020.</p>
        </section>
    );
}

function FirstPartySection() {
    return (
        <section>
            <h2>First party</h2>

            <p>
                jsDocs.io does not directly collect personal data from its
                visitors.
            </p>
        </section>
    );
}

function AnalyticsSection() {
    return (
        <section>
            <h2>Analytics</h2>

            <p>
                jsDocs.io uses <A href="https://plausible.io/">Plausible</A>, a
                privacy-friendly web analytics tool, to measure website usage
                statistics such as the number of page views.
            </p>

            <p>
                To learn more about the data collected by Plausible, you can
                visit their{' '}
                <A href="https://plausible.io/data-policy">data policy</A> and{' '}
                <A href="https://plausible.io/privacy">privacy policy</A> pages.
            </p>
        </section>
    );
}

function HostingSection() {
    return (
        <section>
            <h2>Hosting</h2>

            <p>
                jsDocs.io is hosted by <A href="https://vercel.com/">Vercel</A>,
                which may collect some data to provide its hosting services.
            </p>

            <p>
                To learn more about the data collected by Vercel, you can visit
                their{' '}
                <A href="https://vercel.com/legal/privacy-policy">
                    privacy policy
                </A>{' '}
                page.
            </p>
        </section>
    );
}

function LinksToExternalWebsitesSection() {
    return (
        <section>
            <h2>Links to external websites</h2>

            <p>
                jsDocs.io may contain links to external websites not operated by
                us and with different privacy policies.
            </p>

            <p>
                We recommend you to review the privacy policy of any website you
                may visit.
            </p>
        </section>
    );
}

function ContactInformationSection() {
    return (
        <section>
            <h2>Contact information</h2>

            <p>
                You can reach us by email at:{' '}
                <A href="mailto:info@jsdocs.io">info@jsdocs.io</A>.
            </p>
        </section>
    );
}
