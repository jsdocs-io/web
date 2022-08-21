import Head from "next/head";

const TwitterTags = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <Head>
      <meta key="twitter-title" property="twitter:title" content={title} />
      <meta
        key="twitter-description"
        property="twitter:description"
        content={description}
      />
      <meta key="twitter-card" property="twitter:card" content="summary" />
      <meta key="twitter-site" property="twitter:site" content="@jsDocs" />
      <meta
        key="twitter-image"
        property="twitter:image"
        content="https://www.jsdocs.io/logo-bg.png"
      />
      <meta
        key="twitter-image-alt"
        property="twitter:image:alt"
        content="Logo for jsDocs.io"
      />
    </Head>
  );
};

export default TwitterTags;
