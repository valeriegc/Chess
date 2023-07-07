<script lang="ts">
	import { boardArr, selectedSquare, allowedMoves, turn, moves } from '../stores';
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

	const changeTurn = () => {
		$turn == 'white' ? ($turn = 'black') : ($turn = 'white');
	};
	const movePiece = (newSquare: number) => {
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
		$allowedMoves = [];
	};
	const updateSelection = (newSquare: number) => {
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
			$allowedMoves = pieceCheck(
				$boardArr[$selectedSquare].occupier.component!,
				$selectedSquare,
				$boardArr,
				$turn
			)!;
		}
	};

	const castleTheKing = (newSquare: number) => {
		let one: number;
		let two: number;
		if (newSquare > $selectedSquare) {
			one = -1;
			two = -2;
		} else {
			one = 1;
			two = 2;
		}
		//move king
		$boardArr[newSquare + one].occupier.component = $boardArr[$selectedSquare].occupier.component;
		$boardArr[newSquare + one].occupier.color = $boardArr[$selectedSquare].occupier.color;
		// move tower
		$boardArr[newSquare + two].occupier.component = $boardArr[newSquare].occupier.component;
		$boardArr[newSquare + two].occupier.color = $boardArr[newSquare].occupier.color;
		//empty old parts
		$boardArr[$selectedSquare].occupier.component = null;
		$boardArr[$selectedSquare].occupier.color = '';
		$boardArr[newSquare].occupier.component = null;
		$boardArr[newSquare].occupier.color = '';
		$boardArr = $boardArr;
		$moves.push({
			pre: $selectedSquare,
			post: newSquare + one,
			component: $boardArr[$selectedSquare].occupier.component
		});
		$moves.push({
			pre: newSquare,
			post: newSquare + two,
			component: $boardArr[newSquare].occupier.component
		});
		$selectedSquare = -1;
		$allowedMoves = [];
		changeTurn();
	};

	const handleSelectAndMove = (newSquare: number) => {
		if ($allowedMoves.includes(newSquare)) {
			if (!isKingCastling(newSquare, $boardArr, $turn)) {
				movePiece(newSquare);
				changeTurn();
			} else if (isKingCastling(newSquare, $boardArr, $turn)) {
				castleTheKing(newSquare);
			}
			const kingToCheck = $turn == 'white' ? KingB : KingW;
			const kingLocation = $boardArr.findIndex((n) => n.occupier.component == kingToCheck);
			if (kingChecked($boardArr, kingToCheck, kingLocation)) {
				if (kingCheckMate(kingToCheck, kingLocation, $boardArr)) {
				}
			}
			if (!kingChecked($boardArr, kingToCheck, kingLocation)) {
			}
		} else {
			updateSelection(newSquare);
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
					{$allowedMoves.includes(i)
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
