<script>
	import { goto } from '$app/navigation';
</script>

<div class="selectWrap">
	<button on:click={() => goto('/game')}>CREATE A NEW GAME</button>
	<div>
		<p style="font-size:1.5rem;">STATISTICS</p>
		<div style="margin-left:1.5rem">
			<p>GAMES PLAYED:</p>
			<p>LOST:</p>
			<p>WON:</p>
		</div>
		<p style="font-size:1.5rem;">FRIENDS</p>
	</div>
</div>

<style>
	.selectWrap {
		background-color: var(--secondary);
		box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
		padding: 2rem;
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 1;
		grid-row-end: 3;
	}
	button {
		background-color: var(--primary);
		border: none;
		border-radius: 5px;
		padding: 1rem;
		padding-inline: 4rem;
		font-size: 1rem;
		font-style: bold;
		color: var(--secondary);
	}
	button:hover {
		background-color: var(--secondary);
		color: var(--primary);
		cursor: pointer;
		transition: 2ms;
	}
	p {
		color: var(--primary);
	}
</style>
