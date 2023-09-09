import Head from "next/head";

const TitleTag = ({ title }: { title: string }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default TitleTag;
