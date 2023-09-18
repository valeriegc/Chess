<script lang="ts">
	import { gameId, player, waiting, resign, winner, userId } from '../../stores/stores';
	import { doc, onSnapshot } from 'firebase/firestore';
	import { db } from '$lib/firebase/firebase';
	import BoardWrap from './board/BoardWrap.svelte';
	import { addMoves, moves } from '../../stores/moves';
	import { changeTurn } from '../../functions/game/turns/changeTurn';
	import { sendCheckToFirebase, updateFirebase } from '$lib/firebase/firebaseUpdate';
	import { initPieces } from '$lib/functions/rendering/initPieces';
	import type { Piece } from '$lib/interfaces/interfaces';
	import { fillSquare, findKing, invalidSelection } from '$lib/functions/game/moving/squareContent';
	import { pieceCheck } from '$lib/functions/game/moving/pieceCheck';
	import { castleKing, isKingCastling } from '$lib/functions/game/castling/castling';
	import { rowOnEdge } from '$lib/functions/game/moving/squareLocation';
	import { kingNotChecked } from '$lib/functions/game/check/checkedMoves';
	import BoardContent from './board/BoardContent.svelte';
	import { emptySquare } from '$lib/functions/game/moving/squareContent';
	import { kingChecked } from '$lib/functions/game/check/kingChecked';
	import { checkForWinner } from '$lib/functions/game/winning/winnerCheck';
	('../../functions/game/check/kingStatus');

	export let promotePawn;

	let boardArr = initPieces();
	let turn: 'black' | 'white' = 'white';

	$: if (turn !== $player) {
		$waiting = true;
	} else {
		$waiting = false;
	}
	$: black = $player == 'black';
	$: gameRef = doc(db, 'games', $gameId);

	let selectedSquare = -1;
	let possibleMoves: number[] = [];
	let selectedPiece: Piece;
	let checked = false;

	const resetSelection = () => {
		selectedSquare = -1;
		possibleMoves = [];
	};

	const handleClick = (clickedSquare: number) => {
		if (turn !== $player) return;

		const movePossible = possibleMoves.includes(clickedSquare);

		if (!movePossible) {
			select(clickedSquare);
			return;
		}
		if (isKingCastling(boardArr[clickedSquare].piece, turn)) {
			boardArr = castleKing(selectedSquare, clickedSquare, boardArr);
		} else if (selectedPiece.type == 'pawn' && rowOnEdge(clickedSquare)) {
			promotePawn = true;
			return;
		} else {
			move(clickedSquare);
		}
	};

	const move = async (newSquare: number) => {
		checked = false;
		boardArr = emptySquare(boardArr, selectedSquare);
		boardArr = fillSquare({ piece: selectedPiece!, square: newSquare }, boardArr);
		addMoves(selectedSquare, newSquare, selectedPiece!);
		turn = changeTurn(turn);
		updateFirebase(gameRef, boardArr, turn, $moves);
		resetSelection();

		const kingLoc = findKing(boardArr, turn);
		checked = kingChecked(boardArr, { type: 'king', color: turn }, kingLoc);
		if (checked) {
			sendCheckToFirebase(gameRef, turn);
			checkForWinner(boardArr, turn, $player, gameRef);
		}
	};

	const select = (clickedSquare: number) => {
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

	$: if ($gameId) {
		onSnapshot(doc(db, 'games', $gameId), (doc) => {
			const allData = doc.data();
			if (allData) {
				boardArr = allData.board;
				turn = allData.player;
				checked = allData.checked;
				$moves = allData.moves;
				$winner = allData.winner;
				if (allData.resignation.resigned) {
					($resign.resigned = true), ($resign.resigner = allData.resignation.resigner);
				}
			}
		});
	}
</script>

<BoardWrap player={$player}>
	<BoardContent
		{boardArr}
		{selectedSquare}
		{possibleMoves}
		{turn}
		{checked}
		{black}
		{handleClick}
	/>
</BoardWrap>

<style>
</style>
