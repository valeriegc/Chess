<script lang="ts">
	import { darkSquares } from '$lib/functions/rendering/board';
	import { getPiececomponent } from '$lib/functions/rendering/getPieceComponent';
	import type { Square } from '$lib/interfaces/interfaces';
	import { fade, fly } from 'svelte/transition';
	export let boardArr: Square[];
	export let turn: 'black' | 'white';
	export let checked: boolean;
	export let possibleMoves: number[];
	export let selectedSquare: number;
	export let black: boolean;
	export let handleClick: (i: number) => void;
</script>

<div class="boardGrid" class:black>
	{#each boardArr as square, i}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="square"
			class:black
			style="background-color:{checked && turn == square.piece?.color && square.piece.type == 'king'
				? 'red'
				: possibleMoves.includes(i)
				? 'var(--possibleMove)'
				: i == selectedSquare
				? 'var(--selectedSquare)'
				: darkSquares.includes(i)
				? 'var(--darkSquare)'
				: 'var(--lightSquare)'}"
			on:click={() => handleClick(i)}
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
