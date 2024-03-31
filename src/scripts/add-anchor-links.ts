import AnchorJS from "anchor-js";

const anchors = new AnchorJS();
document.addEventListener("DOMContentLoaded", () => {
	anchors.add("h2, h3");
});
