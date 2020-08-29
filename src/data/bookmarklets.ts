export const redirectBookmarklet =
    // eslint-disable-next-line no-script-url
    "javascript:(function(){const{href:h,pathname:p}=window.location;h.startsWith('https://www.npmjs.com/package/')&&(window.location='https://www.jsdocs.io'+p)})();";

export const newTabBookmarklet =
    // eslint-disable-next-line no-script-url
    "javascript:(function(){const{href:h,pathname:p}=window.location;h.startsWith('https://www.npmjs.com/package/')&&window.open('https://www.jsdocs.io'+p)})();";
