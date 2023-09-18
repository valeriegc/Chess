<script lang="ts">
	import { gameId, player, waiting, resign, winner, userId } from '../../stores/stores';
	import { doc, onSnapshot } from 'firebase/firestore';
	import { db, user } from '$lib/firebase/firebase';
	import PromoteModal from './modals/PromoteModal.svelte';
	import BoardWrap from './board/BoardWrap.svelte';
	import { addMoves, moves } from '../../stores/moves';
	import {
		sendCheckToFirebase,
		updateFirebase,
		updateFirebaseStats,
		updateWinnerToFirebase
	} from '$lib/firebase/firebaseUpdate';
	import { initPieces } from '$lib/functions/rendering/initPieces';
	import type { FillSquare, Piece, Square } from '$lib/interfaces/interfaces';
	import { findKing, invalidSelection } from '$lib/functions/game/moving/squareContent';
	import { pieceCheck } from '$lib/functions/game/moving/pieceCheck';
	import { getCastleLocations, isKingCastling } from '$lib/functions/game/castling/castling';
	import { rowOnEdge } from '$lib/functions/game/moving/squareLocation';
	import { isCheckMate } from '$lib/functions/game/check/isCheckMate';
	import { moveAllowedWhileCheck } from '$lib/functions/game/check/checkedMoves';
	import { kingChecked } from '$lib/functions/game/check/kingChecked';
	import BoardContent from './board/BoardContent.svelte';

	let boardArr = initPieces();
	let turn: 'black' | 'white' = 'white';
	let promotionVisible = false;

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
	$: gameRef = doc(db, 'games', $gameId);

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

	$: if ($winner !== '') {
		updateFirebaseStats($player, $winner, $userId);
	}

	const checkForWinner = async () => {
		kingLocation = findKing(boardArr, turn);
		const checkMate = isCheckMate(boardArr, turn, kingLocation);
		if (checkMate) {
			updateWinnerToFirebase(gameRef, $player);
			checkForWinner();
		}
	};

	const fillSquare = ({ piece, square }: FillSquare) => {
		boardArr[square].piece = piece;
	};
	const emptySquare = (square: number) => {
		boardArr[square].piece = null;
	};
	const pawnPromotion = () => {
		promotionVisible = true;
	};

	const movePiece = async (newSquare: number) => {
		checked = false;
		emptySquare(selectedSquare);
		fillSquare({ piece: selectedPiece!, square: newSquare });
		addMoves(selectedSquare, newSquare, selectedPiece!);
		resetSelection();
		resetAllowedMoves();
		changeTurn();
		updateFirebase(gameRef, boardArr, turn, $moves);
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

		if (!moveAllowed) {
			updateSelection(clickedSquare);
			return;
		}

		if (isKingCastling(boardArr[clickedSquare].piece, turn)) {
			castleKing(selectedSquare, clickedSquare, boardArr);
		} else if (selectedPiece.type == 'pawn' && rowOnEdge(clickedSquare)) {
			pawnPromotion();
		} else {
			movePiece(clickedSquare);
		}

		resetSelection();
		resetAllowedMoves();
		kingLocation = findKing(boardArr, turn);
		checked = kingChecked(boardArr, { type: 'king', color: turn }, kingLocation);
		if (checked) {
			sendCheckToFirebase(gameRef, player);
		}
	};

	$: if ($gameId) {
		onSnapshot(doc(db, 'games', $gameId), (doc) => {
			const allData = doc.data();
			if (allData) {
				boardArr = allData.board;
				turn = allData.player;
				$moves = allData.moves;
				$winner = allData.winner;
				if (allData.resignation.resigned) {
					($resign.resigned = true), ($resign.resigner = allData.resignation.resigner);
				}
				if (allData.checked == $player) {
					checked = true;
				}
			}
		});
	}
</script>

{#if promotionVisible}
	<PromoteModal bind:promotionVisible />
{/if}
<BoardWrap player={$player}>
	<BoardContent
		{boardArr}
		{selectedSquare}
		{allowedMoves}
		{turn}
		{checked}
		{black}
		{handleSelectAndMove}
	/>
</BoardWrap>

<style>
</style>
