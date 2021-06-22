import NextHead from 'next/head';
import React from 'react';
import { A } from '../components/common/A';
import { Layout } from '../components/common/Layout';
import { vercelPrivacyPolicyURL, vercelURL } from '../data/vercel-url';

export default function PrivacyPolicyPage() {
    const pageTitle = 'Privacy Policy - jsDocs.io';
    const pageDescription = 'Privacy policy for jsDocs.io';

    return (
        <>
            <NextHead>
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
            </NextHead>

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
            <h1>Privacy Policy</h1>

            <p>This page contains the privacy policy for jsDocs.io.</p>

            <p>The privacy policy was last updated on April 7, 2021.</p>
        </section>
    );
}

function FirstPartySection() {
    return (
        <section>
            <h2>First Party</h2>

            <p>
                On jsDocs.io we do not directly collect personal data from our
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
                To measure traffic and usage statistics for jsDocs.io, we use{' '}
                <A href="https://plausible.io/">Plausible</A>, a
                privacy-friendly web analytics tool.
            </p>

            <p>
                Plausible {"doesn't"} use cookies and {"doesn't"} collect or
                store personal data.
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
                jsDocs.io is hosted on <A href={vercelURL}>Vercel</A>, which may
                collect some data to provide its hosting services.
            </p>

            <p>
                To learn more about the data collected by Vercel, you can visit
                their <A href={vercelPrivacyPolicyURL}>privacy policy</A> page.
            </p>
        </section>
    );
}

function LinksToExternalWebsitesSection() {
    return (
        <section>
            <h2>Links to External Websites</h2>

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
            <h2>Contact Information</h2>

            <p>
                You can reach us by email at{' '}
                <A href="mailto:info@jsdocs.io">info@jsdocs.io</A>.
            </p>
        </section>
    );
}
