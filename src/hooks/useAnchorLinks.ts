import AnchorJS from "anchor-js";
import { useEffect } from "react";

const useAnchorLinks = () => {
  useEffect(() => {
    const anchors = new AnchorJS();
    anchors.add("h2, h3");
  }, []);
};

export default useAnchorLinks;
