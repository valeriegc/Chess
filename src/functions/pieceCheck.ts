import { towerCheck } from './moveChecks/towerCheck';
import type { Piece, Square } from '../stores';
import { horseCheck } from './moveChecks/horseCheck';
import { pawnCheck } from './moveChecks/pawnCheck';
import { queenCheck } from './moveChecks/queenCheck';
import { bishopCheck } from './moveChecks/bishopCheck';
import { kingCheck } from './moveChecks/kingCheck';

export const pieceCheck = (
	movingPiece: Piece,
	targetSquare: number,
	board: Square[],
	turn: string
) => {
	let pieceType = movingPiece.type;
	switch (pieceType) {
		case 'tower':
			return towerCheck(targetSquare, board, turn);

		case 'horse':
			return horseCheck(targetSquare, board, turn);

		case 'pawn':
			return pawnCheck(targetSquare, board, turn);

		case 'queen':
			return queenCheck(targetSquare, board, turn);

		case 'bishop':
			return bishopCheck(targetSquare, board, turn);

		case 'king':
			return kingCheck(targetSquare, board, turn);
	}
};
