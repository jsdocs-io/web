import Head from "next/head";

const OpenGraphTags = ({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) => {
  return (
    <Head>
      <meta key="og-title" property="og:title" content={title} />
      <meta
        key="og-description"
        property="og:description"
        content={description}
      />
      <meta key="og-url" property="og:url" content={url} />
      <meta key="og-type" property="og:type" content="website" />
      <meta
        key="og-image"
        property="og:image"
        content="https://www.jsdocs.io/logo-bg.png"
      />
      <meta key="og-alt" property="og:image:alt" content="Logo for jsDocs.io" />
      <meta key="og-site-name" property="og:site_name" content="jsDocs.io" />
    </Head>
  );
};

export default OpenGraphTags;
