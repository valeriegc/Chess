<script>
	import { getPiececomponent } from '../../../../functions/rendering/getPieceComponent';
	import { moves } from '../../../stores/moves';
	import Spinner from './Spinner.svelte';
</script>

<div class="outerMove">
	<h3>Moves</h3>
	<div>
		<Spinner />
	</div>
	<div class="moves">
		{#if $moves}
			{#each $moves as move}
				<div class="moveLine">
					<div class="pieceBox">
						<svelte:component this={getPiececomponent(move.piece)} />
					</div>

					<p>
						Moved from <strong>{move.preCoord}</strong>
						to
						<strong>{move.postCoord}</strong>
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
		margin-left: 2rem;
		background-color: rgba(252, 249, 249, 0.151);
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.moves {
		overflow-y: scroll;
		margin-top: 1rem;
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
		width: 10px;
	}

	/*track*/
	::-webkit-scrollbar-track {
		background: transparent;
		-webkit-border-radius: 10px;
		border-radius: 10px;
	}

	/*handle */
	::-webkit-scrollbar-thumb {
		background: var(--primary);
		-webkit-border-radius: 10px;
		border-radius: 10px;
	}

	/*handle-hover*/
	::-webkit-scrollbar-thumb:hover {
		background: rgba(169, 169, 169, 0.524);
	}
</style>
