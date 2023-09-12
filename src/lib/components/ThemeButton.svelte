<script lang="ts">
	import FormatPaintIcon from '$lib/icons/FormatPaintIcon.svelte';

	const changeTheme = () => {
		if (document.documentElement.getAttribute('data-theme') === 'dark') {
			localStorage.theme = 'light';
			document.documentElement.setAttribute('data-theme', 'light');
		} else {
			localStorage.theme = 'dark';
			document.documentElement.setAttribute('data-theme', 'dark');
		}
	};
</script>

<button type="button" class="btn btn-ghost" title="Change theme" on:click={changeTheme}>
	<FormatPaintIcon class="h-6 w-6" />
	Theme
</button>
