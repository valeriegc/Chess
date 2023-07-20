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
		background-color: var(--darkSquare);
		border: solid 1px var(--darkSquare);
		border-radius: 30px;
		color: var(--darkSquare);
		padding: 2rem;
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 1;
		grid-row-end: 3;
	}
	button {
		background-color: var(--lightSquare);
		border: none;
		border-radius: 5px;
		padding: 1rem;
		padding-inline: 4rem;
		font-size: 1rem;
		font-style: bold;
		color: var(--darkSquare);
	}
	button:hover {
		background-color: white;
		cursor: pointer;
		transition: 2000;
	}
	p {
		color: var(--lightSquare);
	}
</style>
