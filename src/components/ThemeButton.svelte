<script lang="ts">
	import LucideContrast from "~icons/lucide/contrast";

	function toggleTheme() {
		if (document.documentElement.classList.contains("dark")) {
			localStorage.theme = "light";
			document.documentElement.classList.remove("dark");
		} else {
			localStorage.theme = "dark";
			document.documentElement.classList.add("dark");
		}
	}
</script>

<button
	type="button"
	class="btn-sm-icon-outline"
	title="Change theme"
	onclick={() => {
		toggleTheme();
	}}
>
	<LucideContrast class="size-4" />
	<span class="sr-only">Change theme</span>
</button>
