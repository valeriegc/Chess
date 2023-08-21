<script lang="ts">
	import { gameId, type Piece, type Square, player, moves } from '../stores';
	import { initPieces } from '../functions/initPieces';
	import { fade, fly } from 'svelte/transition';
	import { pieceCheck } from '../functions/pieceCheck';
	import { kingCheckMate, kingChecked } from '../functions/kingChecked';
	import { alphaCalc, isKingCastling, letters } from '../global';
	import { moveAllowedWhileCheck } from '../functions/moveChecks/checkedMoves';
	import { getPiececomponent } from '../functions/getPieceComponent';
	import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
	import { db } from '$lib/firebase/firebase';

	let boardArr = initPieces();
	let turn: 'black' | 'white' = 'white';

	let selectedSquare = -1;
	let allowedMoves: number[] = [];

	let allAllowedMoves;
	let selectedPiece: Piece;
	let checked = false;
	let kingLocation = -1;

	const changeTurn = () => {
		turn == 'white' ? (turn = 'black') : (turn = 'white');
		return turn;
	};

	interface FillSquare {
		piece: Piece;
		square: number;
	}

	const fillSquare = ({ piece, square }: FillSquare) => {
		//ask Alex : prop syntax
		boardArr[square].piece = piece;
	};
	const emptySquare = (square: number) => {
		boardArr[square].piece = null;
	};

	const movePiece = async (newSquare: number) => {
		const gameRef = doc(db, 'games', $gameId);
		if (turn !== $player) return;
		checked = false;
		fillSquare({ piece: selectedPiece!, square: newSquare });
		emptySquare(selectedSquare);
		addMoves(selectedSquare, newSquare, selectedPiece!);
		selectedSquare = -1;
		allowedMoves = [];
		changeTurn();
		await updateDoc(gameRef, {
			board: boardArr,
			player: turn
		});
	};

	const updateSelection = (newSquare: number) => {
		if (turn !== $player) return;
		const emptySquare = boardArr[newSquare].piece == null;
		//check for opponent piece, if the square is not empty
		const opponentPiece = boardArr[newSquare].piece?.color !== turn; //ask Alex: possibly null => best solution?

		if (emptySquare || opponentPiece) return;

		if (checked) {
			selectedSquare = newSquare;
			selectedPiece = boardArr[selectedSquare].piece!; // FIX
			allAllowedMoves = pieceCheck(selectedPiece!, selectedSquare, boardArr, turn)!;
			allowedMoves = allAllowedMoves.filter((n: number) => {
				return moveAllowedWhileCheck(
					boardArr,
					n,
					selectedSquare,
					kingLocation,
					selectedPiece!,
					turn
				);
			});
			if (kingCheckMate({ type: 'king', color: turn }, kingLocation, boardArr)) {
				alert('Game over king is check mate');
			}
		} else {
			selectedSquare = newSquare;
			selectedPiece = boardArr[selectedSquare].piece!; //FIX
			allowedMoves = pieceCheck(boardArr[selectedSquare].piece!, selectedSquare, boardArr, turn)!; // Ask alex can I use exclamation
		}
	};

	const addMoves = (previouspos: number, newpos: number, piece: Piece) => {
		const preAlph = alphaCalc(previouspos);
		const postAlph = alphaCalc(newpos);
		$moves.push({
			pre: previouspos,
			post: newpos,
			piece: piece,
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

		const movingKing = board[oldKingLoc].piece!;
		fillSquare({ piece: movingKing!, square: newKingLoc });
		emptySquare(oldKingLoc);

		const movingTower = board[oldTowerLoc].piece!;
		fillSquare({ piece: movingTower!, square: newTowerLoc });
		emptySquare(oldTowerLoc);
		addMoves(oldKingLoc, newKingLoc, movingKing);
		addMoves(oldTowerLoc, newTowerLoc, movingTower);
	};

	const handleSelectAndMove = (newSquare: number) => {
		if (!allowedMoves.includes(newSquare)) {
			updateSelection(newSquare);
			return;
		}
		if (isKingCastling(boardArr[newSquare].piece, turn)) {
			castleTheKing(selectedSquare, newSquare, boardArr);
		} else {
			movePiece(newSquare);
		}
		selectedSquare = -1;
		allowedMoves = [];
		kingLocation = boardArr.findIndex((n) => n.piece?.type == 'king' && n.piece.color == turn);
		checked = kingChecked(boardArr, { type: 'king', color: turn }, kingLocation);
	};

	const darkSquares = [
		1, 3, 5, 7, 8, 10, 12, 14, 17, 19, 21, 23, 24, 26, 28, 30, 33, 35, 37, 39, 40, 42, 44, 46, 49,
		51, 53, 55, 56, 58, 60, 62, 64
	];

	const unSub = onSnapshot(doc(db, 'games', $gameId), (doc) => {
		const allData = doc.data();
		if (allData) {
			boardArr = allData?.board;
			turn = allData?.player;
		}
	});
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
			{#each boardArr as square, i}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="square"
					style="background-color:{checked &&
					turn == square.piece?.color &&
					square.piece.type == 'king'
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
	}
	.boardX {
		display: flex;
		height: 40px;
		padding-inline: 40px;
	}
	.letters {
		width: 70px;
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
		height: 70px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.boardGrid {
		height: 550px;
		width: 550px;
		display: grid;
		border: solid lightgray 1px;
		grid-template-columns: repeat(8, 1fr);
		grid-template-rows: repeat(8, 1fr);
	}
	.square {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
