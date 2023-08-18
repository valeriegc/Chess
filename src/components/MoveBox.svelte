<script>
	import { getPiececomponent } from '../functions/getPieceComponent';
	import { moves } from '../stores';
</script>

<div class="outerMove">
	<div class="moveBox">
		<h3>Moves</h3>
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
	</div>
</div>

<style>
	.outerMove {
		height: 400px;
		width: 350px;
		overflow: hidden;
		margin: auto;
	}
	.moveBox {
		height: 400px;
		width: 350px;
		background-color: whitesmoke;
		overflow-y: scroll;
	}
	h3 {
		text-align: center;
		margin-bottom: 1rem;
	}
	.moveLine {
		border-bottom: solid 1px black;
		display: flex;
		flex-direction: row;
		color: black;
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
		background: var(--darkSquare);
		-webkit-border-radius: 10px;
		border-radius: 10px;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: white;
	}
</style>
