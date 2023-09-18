<script>
	import { darkSquares } from '$lib/functions/rendering/board';
	import { getPiececomponent } from '$lib/functions/rendering/getPieceComponent';
	import { fade, fly } from 'svelte/transition';
	export let boardArr;
	export let turn;
	export let checked;
	export let allowedMoves;
	export let selectedSquare;
	export let black;
	export let handleSelectAndMove;
</script>

<div class="boardGrid" class:black>
	{#each boardArr as square, i}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="square"
			class:black
			style="background-color:{checked && turn == square.piece?.color && square.piece.type == 'king'
				? 'red'
				: allowedMoves.includes(i)
				? 'var(--possibleMove)'
				: i == selectedSquare
				? 'var(--selectedSquare)'
				: darkSquares.includes(i)
				? 'var(--darkSquare)'
				: 'var(--lightSquare)'}"
			on:click={() => handleSelectAndMove(i)}
		>
			{#if square.piece !== null}
				<div in:fly={{ duration: 1000 }} out:fade>
					<svelte:component this={getPiececomponent(square.piece)} />
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.boardGrid {
		height: 550px;
		width: 550px;
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		grid-template-rows: repeat(8, 1fr);
	}
	.square {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.black {
		transform: scaleY(-1);
	}
</style>
