import type { Piece, Square } from '../stores';
import { horseCheck } from './moveChecks/horseCheck';
import { pawnCheck } from './moveChecks/pawnCheck';
import { towerCheck } from './moveChecks/towerCheck';
import { bishopCheck } from './moveChecks/bishopCheck';
import { kingCheck } from './moveChecks/kingCheck';
import KingB from '../pieces/King_B.svelte';
import { row } from '../global';

export const kingChecked = (board: Square[], king: Piece, kingLocation: number) => {
	const opponentColor = king.color == 'black' ? 'white' : 'black';
	let ownColor = king.color;

	let isKingChecked = false;

	const checkForOpponent = (threatArr: number[], piece: Piece) => {
		threatArr.forEach((n) => {
			if (board[n].piece == piece) isKingChecked = true;
		});
	};

	const pawnThreat = pawnCheck(kingLocation, board, ownColor);
	const pawnThreatFinal = pawnThreat.filter(
		(n) => n !== kingLocation + row && n !== kingLocation - row
	);
	checkForOpponent(pawnThreatFinal, { type: 'pawn', color: opponentColor });

	const bishopThreat = bishopCheck(kingLocation, board, opponentColor);
	checkForOpponent(bishopThreat, { type: 'bishop', color: opponentColor });

	const towerThreat = towerCheck(kingLocation, board, opponentColor);
	checkForOpponent(towerThreat, { type: 'tower', color: opponentColor });

	const horseThreat = horseCheck(kingLocation, board, opponentColor);
	checkForOpponent(horseThreat, { type: 'horse', color: opponentColor });

	const queenThreat = bishopThreat.concat(towerThreat);
	checkForOpponent(queenThreat, { type: 'queen', color: opponentColor });

	if (bishopThreat || towerThreat || horseThreat || queenThreat) isKingChecked = true;
	console.log(isKingChecked);
	return isKingChecked;
};

export const kingCheckMate = (king: Piece, index: number, board: Square[]) => {
	let remainingKingMoves = [];
	let turn = '';
	if (king == KingB) {
		turn = 'black';
		remainingKingMoves = kingCheck(index, board, turn);
		const allowedKingMoves = remainingKingMoves.filter((n) => !kingChecked(board, king, n));
		if (allowedKingMoves.length == 0) return true;
	} else {
		turn = 'white';
		remainingKingMoves = kingCheck(index, board, turn);
		const allowedKingMoves = remainingKingMoves.filter((n) => !kingChecked(board, king, n));

		if (allowedKingMoves.length == 0) return true;
	}
	return false;
};
