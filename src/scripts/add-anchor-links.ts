import AnchorJS from "anchor-js";

const anchors = new AnchorJS({ class: "no-underline" });
document.addEventListener("DOMContentLoaded", () => {
	anchors.add("h2, h3");
});
