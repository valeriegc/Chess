<script>
	import { getPiececomponent } from '../functions/getPieceComponent';
	import { moves } from '../stores';
</script>

<div class="outerMove">
	<div class="moveBox">
		<h3>Moves</h3>
		{#if $moves}
			{#each $moves as move}
				<div class="moveLine">
					<div class="pieceBox">
						<svelte:component this={getPiececomponent(move.piece)} />
					</div>

					<p>
						Moved from <strong>{move.postCoord}</strong>
						to
						<strong>{move.preCoord}</strong>
					</p>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	.outerMove {
		height: 400px;
		width: 350px;
		overflow: hidden;
		margin-left: 2rem;
	}
	.moveBox {
		width: 350px;
		overflow-y: scroll;
	}
	h3 {
		text-align: center;
		margin-bottom: 1rem;
		color: white;
	}
	.moveLine {
		border-bottom: solid 1px var(--primary);
		display: flex;
		flex-direction: row;
		padding-left: 3rem;
	}
	p {
		margin-left: 2rem;
	}
	::-webkit-scrollbar {
		width: 15px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: transparent;
		-webkit-border-radius: 10px;
		border-radius: 10px;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: var(--primary);
		-webkit-border-radius: 10px;
		border-radius: 10px;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: var(--secondary);
	}
</style>
