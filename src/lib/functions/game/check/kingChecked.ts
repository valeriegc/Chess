import type { Piece, Square } from '$lib/interfaces/interfaces';
import { bishopCheck } from '../moving/bishop';
import { horseCheck } from '../moving/horse';
import { pawnCheck } from '../moving/pawn';
import { rookCheck } from '../moving/rook';
import { row } from '../moving/squareLocation';

export const kingChecked = (board: Square[], king: Piece, kingLocation: number) => {
	const opponentColor = king.color == 'black' ? 'white' : 'black';
	const ownColor = king.color;
	let isKingChecked = false;

	const checkForOpponent = (threatArr: number[], piece: Piece) => {
		threatArr.forEach((n) => {
			if (board[n].piece?.type == piece.type && board[n].piece?.color == piece.color)
				isKingChecked = true;
		});
	};

	const pawnThreat = pawnCheck(kingLocation, board, ownColor);
	const pawnThreatFinal = pawnThreat.filter(
		(n) => n !== kingLocation + row && n !== kingLocation - row
	);
	checkForOpponent(pawnThreatFinal, { type: 'pawn', color: opponentColor });

	const bishopThreat = bishopCheck(kingLocation, board, ownColor);
	checkForOpponent(bishopThreat, { type: 'bishop', color: opponentColor });

	const towerThreat = rookCheck(kingLocation, board, ownColor);
	checkForOpponent(towerThreat, { type: 'rook', color: opponentColor });

	const horseThreat = horseCheck(kingLocation, board, ownColor);
	checkForOpponent(horseThreat, { type: 'horse', color: opponentColor });

	const queenThreat = bishopThreat.concat(towerThreat);
	checkForOpponent(queenThreat, { type: 'queen', color: opponentColor });
	return isKingChecked;
};
