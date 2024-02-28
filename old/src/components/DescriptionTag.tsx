import Head from "next/head";

const DescriptionTag = ({ description }: { description: string }) => {
  return (
    <Head>
      <meta key="description" name="description" content={description} />
    </Head>
  );
};

export default DescriptionTag;
