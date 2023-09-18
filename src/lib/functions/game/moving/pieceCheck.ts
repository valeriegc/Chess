import { rookCheck } from './rook';
import { horseCheck } from './horse';
import { pawnCheck } from './pawn';
import { queenCheck } from './queen';
import { bishopCheck } from './bishop';
import { kingCheck } from './king';
import type { Piece, Square } from '$lib/interfaces/interfaces';

export const pieceCheck = (
	movingPiece: Piece,
	targetSquare: number,
	board: Square[],
	turn: string
) => {
	let pieceType = movingPiece.type;
	switch (pieceType) {
		case 'rook':
			return rookCheck(targetSquare, board, turn);

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
