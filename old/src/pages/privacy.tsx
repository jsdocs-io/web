import NextHead from "next/head";
import A from "../components/common/A";
import Layout from "../components/common/Layout";
import { vercelPrivacyPolicyURL, vercelURL } from "../data/vercel-url";

const PrivacyPolicyPage = () => {
  const pageTitle = "Privacy Policy - jsDocs.io";
  const pageDescription = "Privacy policy for jsDocs.io";

  return (
    <>
      <NextHead>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content="https://www.jsdocs.io/privacy" />

        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
      </NextHead>

      <Layout>
        <article className="space-y-12">
          <IntroSection />
          <FirstPartySection />
          <HostingSection />
          <LinksToExternalWebsitesSection />
          <ContactInformationSection />
        </article>
      </Layout>
    </>
  );
};

const IntroSection = () => {
  return (
    <section>
      <h1>Privacy Policy</h1>

      <p>This page contains the privacy policy for jsDocs.io.</p>

      <p>The privacy policy was last updated on October 4, 2023.</p>
    </section>
  );
};

const FirstPartySection = () => {
  return (
    <section>
      <h2>First Party</h2>

      <p>
        On jsDocs.io we do not directly collect personal data from our visitors.
      </p>
    </section>
  );
};

const HostingSection = () => {
  return (
    <section>
      <h2>Hosting</h2>

      <p>
        jsDocs.io is hosted on <A href={vercelURL}>Vercel</A>, which may collect
        some data to provide its hosting services.
      </p>

      <p>
        To learn more about the data collected by Vercel, you can visit their{" "}
        <A href={vercelPrivacyPolicyURL}>privacy policy</A> page.
      </p>
    </section>
  );
};

const LinksToExternalWebsitesSection = () => {
  return (
    <section>
      <h2>Links to External Websites</h2>

      <p>
        jsDocs.io may contain links to external websites not operated by us and
        with different privacy policies.
      </p>

      <p>
        We recommend you to review the privacy policy of any website you may
        visit.
      </p>
    </section>
  );
};

const ContactInformationSection = () => {
  return (
    <section>
      <h2>Contact Information</h2>

      <p>
        You can reach us by email at{" "}
        <A href="mailto:scibona.edoardo@proton.me">scibona.edoardo@proton.me</A>.
      </p>
    </section>
  );
};

export default PrivacyPolicyPage;
