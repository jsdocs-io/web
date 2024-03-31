document.querySelectorAll("pre.shiki").forEach((pre) => {
	pre.classList.add("relative", "group");
	const copyBtn = document.createElement("button");
	copyBtn.innerText = "Copy";
	copyBtn.classList.add(
		"absolute",
		"top-2",
		"right-2",
		"btn",
		"btn-xs",
		"btn-outline",
		"opacity-0",
		"hover:opacity-100",
		"focus:opacity-100",
		"group-hover:opacity-100",
		"group-focus:opacity-100",
	);
	pre.appendChild(copyBtn);
	copyBtn.addEventListener("click", async () => {
		const text = pre.querySelector("code")!.innerText;
		await navigator.clipboard.writeText(text);
		copyBtn.innerText = "Copied";
		setTimeout(() => (copyBtn.innerText = "Copy"), 1000);
	});
});
