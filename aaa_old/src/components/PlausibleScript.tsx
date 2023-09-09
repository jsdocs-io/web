import Script from "next/script";

const PlausibleScript = () => {
  return (
    <Script
      id="plausible-script"
      src="https://plausible.io/js/plausible.outbound-links.js"
      data-domain="jsdocs.io"
    />
  );
};

export default PlausibleScript;
