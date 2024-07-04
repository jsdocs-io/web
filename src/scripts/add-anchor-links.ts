import AnchorJS from "anchor-js";

const anchors = new AnchorJS({ class: "no-underline" });
document.addEventListener("DOMContentLoaded", () => {
	anchors.add("article h2, article h3");
});
