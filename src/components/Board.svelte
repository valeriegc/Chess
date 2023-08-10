<script lang="ts">
	import { moves, type Square } from '../stores';
	import { initPieces } from '../functions/initPieces';
	import { fade, fly } from 'svelte/transition';
	import { pieceCheck } from '../functions/pieceCheck';
	import { kingCheckMate, kingChecked } from '../functions/kingChecked';
	import KingB from '../pieces/King_B.svelte';
	import KingW from '../pieces/King_W.svelte';
	import { alphaCalc, isKingCastling, letters } from '../global';
	import type { SvelteComponent } from 'svelte';
	import StartGame from './StartGame.svelte';
	import { moveAllowedWhileCheck } from '../functions/moveChecks/checkedMoves';

	let turn = 'white';
	let selectedSquare = -1;
	let allowedMoves: number[] = [];
	let boardArr = initPieces();
	let allAllowedMoves;
	let selectedPiece: null | typeof SvelteComponent = null;

	const changeTurn = () => {
		turn == 'white' ? (turn = 'black') : (turn = 'white');
	};

	interface FillSquare {
		component: typeof SvelteComponent;
		color: string;
		square: number;
	}

	const fillSquare = ({ component, color, square }: FillSquare) => {
		boardArr[square].occupier.component = component;
		boardArr[square].occupier.color = color;
	};
	const emptySquare = (square: number) => {
		boardArr[square].occupier.component = null;
		boardArr[square].occupier.color = '';
	};

	const movePiece = (newSquare: number) => {
		fillSquare({ component: selectedPiece!, color: turn, square: newSquare });
		emptySquare(selectedSquare);
		addMoves(selectedSquare, newSquare, selectedPiece!);
		selectedSquare = -1;
		allowedMoves = [];
	};

	const updateSelection = (newSquare: number) => {
		const emptySquare = boardArr[newSquare].occupier.component == null;
		const opponentPiece = boardArr[newSquare].occupier.color !== turn;

		if (emptySquare || opponentPiece) return;

		const kingToCheck = turn == 'white' ? KingW : KingB;
		const kingLocation = boardArr.findIndex((n) => n.occupier.component == kingToCheck);

		if (kingChecked(boardArr, kingToCheck, kingLocation)) {
			console.log('king still checked');
			selectedSquare = newSquare;
			selectedPiece = boardArr[selectedSquare].occupier.component;
			allAllowedMoves = pieceCheck(selectedPiece!, selectedSquare, boardArr, turn)!;
			allowedMoves = allAllowedMoves.filter((n: number) => {
				let banana = moveAllowedWhileCheck(
					boardArr,
					n,
					selectedSquare,
					kingToCheck,
					kingLocation,
					selectedPiece!
				);
				console.log(banana);
				return banana;
			});
			if (kingCheckMate(kingToCheck, kingLocation, boardArr)) {
				alert('Game over king is check mate');
			}
		} else {
			selectedSquare = newSquare;
			selectedPiece = boardArr[selectedSquare].occupier.component;
			allowedMoves = pieceCheck(
				boardArr[selectedSquare].occupier.component!,
				selectedSquare,
				boardArr,
				turn
			)!;
		}
	};

	const addMoves = (previouspos: number, newpos: number, piece: typeof SvelteComponent) => {
		const preAlph = alphaCalc(previouspos);
		const postAlph = alphaCalc(newpos);
		$moves.push({
			pre: previouspos,
			post: newpos,
			component: piece,
			preCoord: preAlph,
			postCoord: postAlph
		});
		$moves = $moves;
	};

	const castleTheKing = (oldKingLoc: number, oldTowerLoc: number, board: Square[]) => {
		let newKingLoc: number;
		let newTowerLoc: number;
		const castleToLeft = oldTowerLoc > oldKingLoc;

		if (castleToLeft) {
			newKingLoc = oldTowerLoc - 1;
			newTowerLoc = oldTowerLoc - 2;
		} else {
			newKingLoc = oldTowerLoc + 1;
			newTowerLoc = oldTowerLoc + 2;
		}

		const movingKing = board[oldKingLoc].occupier.component!;
		fillSquare({ component: movingKing!, color: turn, square: newKingLoc });
		emptySquare(oldKingLoc);
		const movingTower = board[oldTowerLoc].occupier.component!;
		fillSquare({ component: movingTower!, color: turn, square: newTowerLoc });
		emptySquare(oldTowerLoc);
		addMoves(oldKingLoc, newKingLoc, movingKing);
		addMoves(oldTowerLoc, newTowerLoc, movingTower);
	};

	const handleSelectAndMove = (newSquare: number) => {
		if (!allowedMoves.includes(newSquare)) {
			updateSelection(newSquare);
			return;
		}
		if (isKingCastling(newSquare, boardArr, turn)) {
			castleTheKing(selectedSquare, newSquare, boardArr);
		} else {
			movePiece(newSquare);
		}
		changeTurn();
		selectedSquare = -1;
		allowedMoves = [];
	};

	const darkSquares = [
		1, 3, 5, 7, 8, 10, 12, 14, 17, 19, 21, 23, 24, 26, 28, 30, 33, 35, 37, 39, 40, 42, 44, 46, 49,
		51, 53, 55, 56, 58, 60, 62, 64
	];
</script>

<StartGame />
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
			{#each boardArr as square, i}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="square"
					style="background-color:
					{allowedMoves.includes(i)
						? 'var(--possibleMove)'
						: i == selectedSquare
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
		color: var(--darkSquare);
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
