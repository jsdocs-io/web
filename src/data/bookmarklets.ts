export const redirectBookmarklet =
    "javascript:(function(){const{href:h,pathname:p}=window.location;h.startsWith('https://www.npmjs.com/package/')&&(window.location=`https://www.jsdocs.io${p}`)})();";

export const newTabBookmarklet =
    "javascript:(function(){const{href:h,pathname:p}=window.location;h.startsWith('https://www.npmjs.com/package/')&&window.open(`https://www.jsdocs.io${p}`)})();";
