<script lang="ts">
	import { gameId, type Piece, type Square, player, moves, waiting } from '../stores';
	import { initPieces } from '../functions/initPieces';
	import { fade, fly } from 'svelte/transition';
	import { pieceCheck } from '../functions/pieceCheck';
	import { kingChecked } from '../functions/kingChecked';
	import {
		alphaCalc,
		isKingCastling,
		letters,
		darkSquares,
		type FillSquare,
		getCastleLocations,
		invalidSelection,
		findKing
	} from '../global';
	import { moveAllowedWhileCheck } from '../functions/moveChecks/checkedMoves';
	import { getPiececomponent } from '../functions/getPieceComponent';
	import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
	import { db } from '$lib/firebase/firebase';

	let boardArr = initPieces();
	let turn: 'black' | 'white' = 'white';
	let resignation = {
		resigned: false,
		resigner: ''
	};

	$: if (turn !== $player) {
		$waiting = true;
	} else {
		$waiting = false;
	}

	$: black = $player == 'black';
	let selectedSquare = -1;
	let kingLocation = -1;
	let allowedMoves: number[] = [];
	let allAllowedMoves: number[];
	let selectedPiece: Piece;
	let checked = false;

	const resetSelection = () => {
		selectedSquare = -1;
	};
	const resetAllowedMoves = () => {
		allowedMoves = [];
		allAllowedMoves = [];
	};

	const changeTurn = () => {
		turn == 'white' ? (turn = 'black') : (turn = 'white');
		return turn;
	};

	const fillSquare = ({ piece, square }: FillSquare) => {
		boardArr[square].piece = piece;
	};
	const emptySquare = (square: number) => {
		boardArr[square].piece = null;
	};

	const updateFirebase = async () => {
		await updateDoc(doc(db, 'games', $gameId), {
			board: boardArr,
			player: turn,
			moves: $moves
		});
	};

	const movePiece = async (newSquare: number) => {
		checked = false;
		emptySquare(selectedSquare);
		fillSquare({ piece: selectedPiece!, square: newSquare });
		addMoves(selectedSquare, newSquare, selectedPiece!);
		resetSelection();
		resetAllowedMoves();
		changeTurn();
		updateFirebase();
	};

	const updateSelection = (clickedSquare: number) => {
		if (invalidSelection(boardArr, clickedSquare, turn)) return;
		selectedSquare = clickedSquare;
		selectedPiece = boardArr[selectedSquare].piece!;
		let initialAllowed = pieceCheck(
			boardArr[selectedSquare].piece!,
			selectedSquare,
			boardArr,
			turn
		)!;
		kingLocation = boardArr.findIndex((n) => n.piece?.type == 'king' && n.piece.color == turn);
		allowedMoves = initialAllowed.filter((n: number) => {
			return moveAllowedWhileCheck(boardArr, n, selectedSquare, kingLocation, selectedPiece!, turn);
		});
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

	const castleKing = (oldKingLoc: number, oldTowerLoc: number, board: Square[]) => {
		const movingKing = board[oldKingLoc].piece!;
		const movingTower = board[oldTowerLoc].piece!;
		const newLocations = getCastleLocations(oldTowerLoc, oldKingLoc);

		emptySquare(oldKingLoc);
		emptySquare(oldTowerLoc);

		fillSquare({ piece: movingKing!, square: newLocations.king });
		fillSquare({ piece: movingTower!, square: newLocations.tower });

		addMoves(oldKingLoc, newLocations.king, movingKing);
		addMoves(oldTowerLoc, newLocations.tower, movingTower);
	};

	const handleSelectAndMove = (clickedSquare: number) => {
		const playersTurn = turn == $player;
		if (!playersTurn) return;

		const moveAllowed = allowedMoves.includes(clickedSquare);

		if (moveAllowed) {
			if (isKingCastling(boardArr[clickedSquare].piece, turn)) {
				castleKing(selectedSquare, clickedSquare, boardArr);
			} else {
				movePiece(clickedSquare);
			}
		} else {
			updateSelection(clickedSquare);
			return;
		}
		resetSelection();
		resetAllowedMoves();
		kingLocation = findKing(boardArr, turn);
		checked = kingChecked(boardArr, { type: 'king', color: turn }, kingLocation);
	};

	$: if ($gameId) {
		onSnapshot(doc(db, 'games', $gameId), (doc) => {
			const allData = doc.data();
			if (allData) {
				boardArr = allData?.board;
				turn = allData?.player;
				$moves = allData?.moves;
				if (allData.resignation.resigned) {
					(resignation.resigned = resignation.resigned),
						(resignation.resigner = resignation.resigner);
				}
			}
		});
	}
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
				{#if black}
					{#each { length: 8 } as _, i}
						<div class="numbers">{i + 1}</div>
					{/each}
				{:else}
					{#each { length: 8 } as _, i}
						<div class="numbers">{8 - i}</div>
					{/each}
				{/if}
			</div>
		</div>
		<div class="boardGrid" class:black>
			{#each boardArr as square, i}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="square"
					class:black
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
			{#if black}
				{#each { length: 8 } as _, i}
					<div class="numbers">{i + 1}</div>
				{/each}
			{:else}
				{#each { length: 8 } as _, i}
					<div class="numbers">{8 - i}</div>
				{/each}
			{/if}
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
		width: 680px;
		margin-left: 3rem;
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
		color: whitesmoke;
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
		color: whitesmoke;
	}
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
