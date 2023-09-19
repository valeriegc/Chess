<script lang="ts">
	import { player } from '../../../stores/stores';
	import { getPiececomponent } from '$lib/functions/rendering/getPieceComponent';

	export let promotePawn: boolean;
	export let move;
	export let selectedPiece;
	export let promotionSquare;

	let pieces = [
		{ type: 'queen', color: $player },
		{ type: 'horse', color: $player },
		{ type: 'rook', color: $player },
		{ type: 'bishop', color: $player }
	];

	const promote = (selected) => {
		selectedPiece = selected;
		move(promotionSquare);
		promotePawn = false;
	};
</script>

<div class="container">
	<div class="wrap">
		<h4>Choose a piece for promotion</h4>
		<div class="pieces">
			{#each pieces as piece}
				<div on:click={() => promote(piece)}>
					<div
						class="piece"
						style="background-color:{$player == 'white' ? 'black' : 'white'};z-index:10000"
					>
						<svelte:component this={getPiececomponent(piece)} />
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999;
	}
	.wrap {
		height: 25%;
		width: 30%;
		border-radius: 5px;
		background-color: rgba(0, 0, 0, 0.695);
		color: whitesmoke;
		padding: 1rem;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		gap: 0.75rem;
	}
	.pieces {
		width: fit-content;
		cursor: pointer;
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	}
	.piece {
		padding: 0.1rem;
		border-radius: 5px;
	}
	h4 {
		margin: 0.25rem;
		font-weight: 400;
	}
</style>
