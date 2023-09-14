<script lang="ts">
	import IconFormatPaint from '~icons/material-symbols/format-paint';

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
	<IconFormatPaint class="h-6 w-6" />
	Theme
</button>
