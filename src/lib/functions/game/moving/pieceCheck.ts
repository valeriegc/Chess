import { towerCheck } from './rook';
import type { Piece, Square } from '../../../stores/stores';
import { horseCheck } from './horse';
import { pawnCheck } from './pawn';
import { queenCheck } from './queen';
import { bishopCheck } from './bishop';
import { kingCheck } from './king';

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
