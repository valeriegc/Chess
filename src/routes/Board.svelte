<script lang="ts">
	import { boardArr, selectedSquare } from '../stores';
	import { initPieces } from '../functions/initPieces';
	import { fade, fly } from 'svelte/transition';

	let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

	const whiteSquares = [
		1, 3, 5, 7, 10, 12, 14, 16, 17, 19, 21, 23, 26, 28, 30, 32, 33, 35, 37, 39, 42, 44, 46, 48, 49,
		51, 53, 55, 58, 60, 62, 64
	];

	initPieces($boardArr);

	const handleMove = (squareNumber: number, occupier: string) => {
		if (squareNumber !== $selectedSquare && occupier != '') {
			$selectedSquare = squareNumber;
			$selectedSquare = $selectedSquare;
		} else if (squareNumber !== $selectedSquare && occupier == '') {
			$boardArr[squareNumber - 1].occupier = $boardArr[$selectedSquare - 1].occupier;
			$boardArr[$selectedSquare - 1].occupier = '';
			$boardArr = $boardArr;
			$selectedSquare = 0;
			$selectedSquare = $selectedSquare;
		}
	};
</script>

<div class="boardOuterWrap">
	<div class="boardX">
		{#each letters as letter}
			<div class="letters">{letter}</div>
		{/each}
	</div>
	<div class="boardInnerWrap">
		<div class="boardY">
			<div class="boardY">
				{#each { length: 8 } as _, i}
					<div class="numbers">{i + 1}</div>
				{/each}
			</div>
		</div>
		<div class="boardGrid">
			{#each $boardArr as square}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="square"
					style="background-color:{square.number == $selectedSquare
						? 'var(--selectedSquare'
						: whiteSquares.includes(square.number)
						? 'var(--lightSquare)'
						: 'var(--darkSquare)'}"
					on:click={() => handleMove(square.number, square.occupier)}
				>
					{#if square.occupier !== ''}
						<div in:fly={{ duration: 1000 }} out:fade>
							<svelte:component this={square.occupier} />
						</div>
					{/if}
				</div>
			{/each}
		</div>
		<div class="boardY">
			{#each { length: 8 } as _, i}
				<div class="numbers">{i + 1}</div>
			{/each}
		</div>
	</div>
	<div class="boardX">
		{#each letters as letter}
			<div class="letters">{letter}</div>
		{/each}
	</div>
</div>

<style>
	.boardOuterWrap {
		display: flex;
		flex-direction: column;
		height: 680px;
		width: 680px;
		margin: auto;
		color: black;
	}
	.boardX {
		display: flex;
		height: 40px;
		padding-inline: 40px;
	}
	.letters {
		width: 75px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.boardInnerWrap {
		display: flex;
	}
	.boardY {
		height: 100%;
		width: 40px;
	}
	.numbers {
		height: 75px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.boardGrid {
		height: 600px;
		width: 600px;
		border: solid black 1px;
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		grid-template-rows: repeat(8, 1fr);
	}
	.square {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
