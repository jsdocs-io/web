import Head from "next/head";

const ViewportTag = () => {
  return (
    <Head>
      <meta
        key="viewport"
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
    </Head>
  );
};

export default ViewportTag;
