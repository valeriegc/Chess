<script lang="ts">
	import { boardArr, selectedSquare, allowedSquares, turn, moves } from '../stores';
	import { initPieces } from '../functions/initPieces';
	import { fade, fly } from 'svelte/transition';
	import { pieceCheck } from '../functions/pieceCheck';
	import { kingCheckMate, kingChecked } from '../functions/kingChecked';
	import KingB from '../pieces/King_B.svelte';
	import KingW from '../pieces/King_W.svelte';
	import { isKingCastling } from '../global';

	let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

	const darkSquares = [
		1, 3, 5, 7, 8, 10, 12, 14, 17, 19, 21, 23, 24, 26, 28, 30, 33, 35, 37, 39, 40, 42, 44, 46, 49,
		51, 53, 55, 56, 58, 60, 62, 64
	];

	initPieces();

	const handleSelectAndMove = (newSquare: number) => {
		if ($allowedSquares.includes(newSquare)) {
			if (!isKingCastling(newSquare, $boardArr, $turn)) {
				$boardArr[newSquare].occupier.component = $boardArr[$selectedSquare].occupier.component;
				$boardArr[newSquare].occupier.color = $boardArr[$selectedSquare].occupier.color;
				$boardArr[$selectedSquare].occupier.component = null;
				$boardArr[$selectedSquare].occupier.color = '';
				$boardArr = $boardArr;
				$moves.push({
					pre: $selectedSquare,
					post: newSquare,
					component: $boardArr[newSquare].occupier.component
				});
				$selectedSquare = -1;
				$allowedSquares = [];
			} else if (isKingCastling(newSquare, $boardArr, $turn)) {
				if (newSquare > $selectedSquare) {
					//move king
					$boardArr[newSquare - 1].occupier.component =
						$boardArr[$selectedSquare].occupier.component;
					$boardArr[newSquare - 1].occupier.color = $boardArr[$selectedSquare].occupier.color;
					// move tower
					$boardArr[newSquare - 2].occupier.component = $boardArr[newSquare].occupier.component;
					$boardArr[newSquare - 2].occupier.color = $boardArr[newSquare].occupier.color;
					//empty old parts
					$boardArr[$selectedSquare].occupier.component = null;
					$boardArr[$selectedSquare].occupier.color = '';
					$boardArr[newSquare].occupier.component = null;
					$boardArr[newSquare].occupier.color = '';
					$boardArr = $boardArr;
					$moves.push({
						pre: $selectedSquare,
						post: newSquare - 1,
						component: $boardArr[$selectedSquare].occupier.component
					});
					$moves.push({
						pre: newSquare,
						post: newSquare - 2,
						component: $boardArr[newSquare].occupier.component
					});
					$selectedSquare = -1;
					$allowedSquares = [];
				} else {
					//move king
					$boardArr[newSquare + 1].occupier.component =
						$boardArr[$selectedSquare].occupier.component;
					$boardArr[newSquare + 1].occupier.color = $turn;
					// move tower
					$boardArr[newSquare + 2].occupier.component = $boardArr[newSquare].occupier.component;
					$boardArr[newSquare + 2].occupier.color = $turn;
					//empty old parts
					$boardArr[$selectedSquare].occupier.component = null;
					$boardArr[$selectedSquare].occupier.color = '';
					$boardArr[newSquare].occupier.component = null;
					$boardArr[newSquare].occupier.color = '';
					$boardArr = $boardArr;
					$moves.push({
						pre: $selectedSquare,
						post: newSquare + 1,
						component: $boardArr[$selectedSquare].occupier.component
					});
					$moves.push({
						pre: newSquare,
						post: newSquare + 2,
						component: $boardArr[newSquare].occupier.component
					});
					$selectedSquare = -1;
					$allowedSquares = [];
				}
			}
			const kingToCheck = $turn == 'white' ? KingB : KingW;
			const kingLocation = $boardArr.findIndex((n) => n.occupier.component == kingToCheck);
			if (kingChecked($boardArr, kingToCheck, kingLocation)) {
				if (kingCheckMate(kingToCheck, kingLocation, $boardArr)) {
				}
			}
			if (!kingChecked($boardArr, kingToCheck, kingLocation)) {
			}
			$turn == 'white' ? ($turn = 'black') : ($turn = 'white');
		} else {
			if (
				$boardArr[newSquare].occupier.component == null ||
				$boardArr[newSquare].occupier.color !== $turn
			)
				return;
			else if (
				$boardArr[newSquare].occupier.color == $turn &&
				$boardArr[newSquare].occupier.component !== null
			) {
				$selectedSquare = newSquare;
				$allowedSquares = pieceCheck(
					$boardArr[$selectedSquare].occupier.component!,
					$selectedSquare,
					$boardArr,
					$turn
				)!;
			}
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
			{#each $boardArr as square, i}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="square"
					style="background-color:
					{$allowedSquares.includes(i)
						? 'var(--possibleMove)'
						: i == $selectedSquare
						? 'var(--selectedSquare)'
						: darkSquares.includes(i)
						? 'var(--darkSquare)'
						: 'var(--lightSquare)'}"
					on:click={() => handleSelectAndMove(i)}
				>
					{#if square.occupier !== null}
						<div in:fly={{ duration: 1000 }} out:fade>
							<svelte:component this={square.occupier.component} />
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
