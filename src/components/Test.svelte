<script>
	let { msg = "bar" } = $props();
	let count = $state(0);

	function increment() {
		count += 1;
	}
</script>

<button onclick={increment} class="btn btn-primary font-bold">
	Clicked {msg}
	{count}
	{count === 1 ? "time" : "times"}
</button>
