<script>
	import { player } from '../../../../stores';
	export let promotionVisible;
	import QueenB from '../../../../pieces/Queen_B.svelte';
	import QueenW from '../../../../pieces/Queen_W.svelte';
	import HorseB from '../../../../pieces/Horse_B.svelte';
	import HorseW from '../../../../pieces/Horse_W.svelte';
	import TowerW from '../../../../pieces/Tower_W.svelte';
	import TowerB from '../../../../pieces/Tower_B.svelte';
	import BishopB from '../../../../pieces/Bishop_B.svelte';
	import BishopW from '../../../../pieces/Bishop_W.svelte';

	let whiteOptions = [QueenW, HorseW, TowerW, BishopW];
	let blackOptions = [QueenB, HorseB, TowerB, BishopB];
</script>

<div class="container">
	<div class="wrap">
		<h4>Choose a piece for promotion</h4>
		<div class="pieces">
			{#if $player == 'white'}
				{#each whiteOptions as piece}
					<div class="piece" style="background-color:{$player == 'white' ? 'black' : 'white'}">
						<svelte:component this={piece} />
					</div>
				{/each}
			{:else}
				{#each blackOptions as piece}
					<div class="piece" style="background-color:{$player == 'white' ? 'black' : 'white'}">
						<svelte:component this={piece} />
					</div>
				{/each}
			{/if}
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
		z-index: 100;
	}
	.wrap {
		height: 25%;
		width: 50%;
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
