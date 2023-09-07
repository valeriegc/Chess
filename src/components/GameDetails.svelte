<script>
	import { goto } from '$app/navigation';
</script>

<div class="selectWrap">
	<button on:click={() => goto('/game')}>Start a game</button>
	<div>
		<p style="font-size:1.5rem;">Statistics</p>
		<div style="margin-left:1.5rem">
			<p>Games Played:</p>
			<p>Lost:</p>
			<p>Won:</p>
		</div>
		<p style="font-size:1.5rem;">Friends</p>
	</div>
</div>

<style>
	.selectWrap {
		background-color: rgba(0, 0, 0, 0.562);
		padding: 2rem;
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 1;
		grid-row-end: 3;
		color: whitesmoke;
	}
	button {
		border: none;
		padding: 1rem;
		padding-inline: 4rem;
		font-size: 1rem;
		font-style: bold;
		background-color: rgba(55, 63, 81, 0.798);
	}
	button:hover {
		background-color: var(--secondary);
		color: var(--primary);
		transition: 2ms;
	}
	p {
		color: whitesmoke;
	}
</style>
