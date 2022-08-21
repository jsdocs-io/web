import CharSetTag from "./CharSetTag";
import DescriptionTag from "./DescriptionTag";
import Favicon from "./Favicon";
import OpenGraphTags from "./OpenGraphTags";
import PlausibleScript from "./PlausibleScript";
import TitleTag from "./TitleTag";
import TwitterTags from "./TwitterTags";
import ViewportTag from "./ViewportTag";

const PageHead = ({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) => {
  return (
    <>
      <TitleTag title={title} />
      <DescriptionTag description={description} />
      <CharSetTag />
      <ViewportTag />
      <OpenGraphTags title={title} description={description} url={url} />
      <TwitterTags title={title} description={description} />
      <Favicon />
      <PlausibleScript />
    </>
  );
};

export default PageHead;
