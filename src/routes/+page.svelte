<script>
	import Auth from '../components/Auth.svelte';
</script>

<div class="pageWrap">
	<Auth />
</div>

<style>
	* {
		margin: 0;
	}
	.pageWrap {
		background: linear-gradient(to right, var(--lightSquare), rgb(165, 141, 103));
		min-height: 100vh;
		display: flex;
	}
</style>
