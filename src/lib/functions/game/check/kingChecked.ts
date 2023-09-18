import type { Piece, Square } from '../../stores';
import { horseCheck } from '../game/moves/horse';
import { pawnCheck } from '../game/moves/pawn';
import { towerCheck } from '../game/moves/rook';
import { bishopCheck } from '../game/moves/bishop';
import { row } from '../../global';

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

	const towerThreat = towerCheck(kingLocation, board, ownColor);
	checkForOpponent(towerThreat, { type: 'tower', color: opponentColor });

	const horseThreat = horseCheck(kingLocation, board, ownColor);
	checkForOpponent(horseThreat, { type: 'horse', color: opponentColor });

	const queenThreat = bishopThreat.concat(towerThreat);
	checkForOpponent(queenThreat, { type: 'queen', color: opponentColor });
	return isKingChecked;
};
