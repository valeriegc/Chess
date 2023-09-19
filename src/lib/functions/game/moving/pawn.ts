import type { Square } from '$lib/interfaces/interfaces';
import { hasOpponentPiece } from './squareContent';
import { rowFinder } from './squareLocation';
import { squareOnBoard } from './squareLocation';

export const pawnCheck = (targetSquare: number, board: Square[], turn: string) => {
	const tempArray: number[] = [];
	const rowNumber = rowFinder(targetSquare);
	const rowForward = turn == 'black' ? 8 : -8;

	if (!board[targetSquare + rowForward].piece) {
		tempArray.push(targetSquare + rowForward);
	}
	if (squareOnBoard(targetSquare + rowForward + 1)) {
		if (hasOpponentPiece(board[targetSquare + rowForward + 1].piece, turn)) {
			tempArray.push(targetSquare + rowForward + 1);
		}
	}
	if (squareOnBoard(targetSquare + rowForward + 1)) {
		if (hasOpponentPiece(board[targetSquare + rowForward - 1].piece, turn)) {
			tempArray.push(targetSquare + rowForward - 1);
		}
	}
	if (
		turn == 'black' &&
		rowNumber == 2 &&
		squareOnBoard(targetSquare + 2 * rowForward) &&
		squareOnBoard(targetSquare + rowForward) &&
		board[targetSquare + 2 * rowForward].piece == null &&
		board[targetSquare + rowForward].piece == null
	) {
		tempArray.push(targetSquare + 2 * rowForward);
	} else if (
		rowNumber == 7 &&
		squareOnBoard(targetSquare + 2 * rowForward) &&
		squareOnBoard(targetSquare + rowForward) &&
		board[targetSquare + 2 * rowForward].piece == null &&
		board[targetSquare + rowForward].piece == null
	) {
		tempArray.push(targetSquare + 2 * rowForward);
	}

	return tempArray.filter((n) => n < 64 && n >= 0);
};
