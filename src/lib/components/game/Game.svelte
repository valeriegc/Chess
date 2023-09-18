<script lang="ts">
	import { gameId, player, waiting, resign, winner, userId } from '../../stores/stores';
	import { doc, onSnapshot } from 'firebase/firestore';
	import { db } from '$lib/firebase/firebase';
	import PromoteModal from './modals/PromoteModal.svelte';
	import BoardWrap from './board/BoardWrap.svelte';
	import { addMoves, moves } from '../../stores/moves';
	import { changeTurn } from '../../functions/game/turns/changeTurn';
	import {
		sendCheckToFirebase,
		updateFirebase,
		updateFirebaseStats
	} from '$lib/firebase/firebaseUpdate';
	import { initPieces } from '$lib/functions/rendering/initPieces';
	import type { Piece } from '$lib/interfaces/interfaces';
	import { fillSquare, findKing, invalidSelection } from '$lib/functions/game/moving/squareContent';
	import { pieceCheck } from '$lib/functions/game/moving/pieceCheck';
	import { castleKing, isKingCastling } from '$lib/functions/game/castling/castling';
	import { rowOnEdge } from '$lib/functions/game/moving/squareLocation';
	import { kingNotChecked } from '$lib/functions/game/check/checkedMoves';
	import { kingChecked } from '$lib/functions/game/check/kingChecked';
	import BoardContent from './board/BoardContent.svelte';
	import { checkForWinner } from '$lib/functions/game/winning/winnerCheck';
	import { emptySquare } from '$lib/functions/game/moving/squareContent';

	let boardArr = initPieces();
	let turn: 'black' | 'white' = 'white';
	let promotionVisible = false;

	$: if (turn !== $player) {
		$waiting = true;
	} else {
		$waiting = false;
	}
	$: black = $player == 'black';
	$: gameRef = doc(db, 'games', $gameId);
	$: if ($winner !== '') {
		updateFirebaseStats($player, $winner, $userId);
	}

	let selectedSquare = -1;
	let possibleMoves: number[] = [];
	let selectedPiece: Piece;
	let checked = false;

	const resetSelection = () => {
		selectedSquare = -1;
		possibleMoves = [];
	};

	const pawnPromotion = () => {
		promotionVisible = true;
	};

	const movePiece = async (newSquare: number) => {
		checked = false;
		boardArr = emptySquare(boardArr, selectedSquare);
		boardArr = fillSquare({ piece: selectedPiece!, square: newSquare }, boardArr);
		addMoves(selectedSquare, newSquare, selectedPiece!);
		turn = changeTurn(turn);
		updateFirebase(gameRef, boardArr, turn, $moves);
	};

	const updateSelection = (clickedSquare: number) => {
		if (invalidSelection(boardArr, clickedSquare, turn)) return;
		selectedSquare = clickedSquare;
		selectedPiece = boardArr[selectedSquare].piece!;
		let movesForPiece = pieceCheck(
			boardArr[selectedSquare].piece!,
			selectedSquare,
			boardArr,
			turn
		)!;
		const kingLoc = boardArr.findIndex((n) => n.piece?.type == 'king' && n.piece.color == turn);
		possibleMoves = movesForPiece.filter((n: number) => {
			return kingNotChecked(boardArr, n, selectedSquare, kingLoc, selectedPiece!, turn);
		});
	};

	const handleSelectAndMove = (clickedSquare: number) => {
		const playersTurn = turn == $player;
		if (!playersTurn) return;

		const moveAllowed = possibleMoves.includes(clickedSquare);

		if (!moveAllowed) {
			updateSelection(clickedSquare);
			return;
		}

		if (isKingCastling(boardArr[clickedSquare].piece, turn)) {
			boardArr = castleKing(selectedSquare, clickedSquare, boardArr);
		} else if (selectedPiece.type == 'pawn' && rowOnEdge(clickedSquare)) {
			pawnPromotion();
		} else {
			movePiece(clickedSquare);
		}
		resetSelection();
		const kingLoc = findKing(boardArr, turn);
		checked = kingChecked(boardArr, { type: 'king', color: turn }, kingLoc);
		if (checked) {
			sendCheckToFirebase(gameRef, player);
			checkForWinner(boardArr, turn, player, gameRef);
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
		{possibleMoves}
		{turn}
		{checked}
		{black}
		{handleSelectAndMove}
	/>
</BoardWrap>

<style>
</style>
