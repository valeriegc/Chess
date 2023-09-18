import { rowFinder, hasOpponentPiece } from '../../../global';
import type { Square } from '../../../stores/stores';

export const pawnCheck = (targetSquare: number, board: Square[], turn: string) => {
	const tempArray: number[] = [];
	const rowNumber = rowFinder(targetSquare);
	const rowForward = turn == 'black' ? 8 : -8;

	if (!board[targetSquare + rowForward].piece) {
		tempArray.push(targetSquare + rowForward);
	}
	if (hasOpponentPiece(board[targetSquare + rowForward + 1].piece, turn)) {
		tempArray.push(targetSquare + rowForward + 1);
	}
	if (hasOpponentPiece(board[targetSquare + rowForward - 1].piece, turn)) {
		tempArray.push(targetSquare + rowForward - 1);
	}
	if (
		turn == 'black' &&
		rowNumber == 2 &&
		board[targetSquare + 2 * rowForward].piece == null &&
		board[targetSquare + rowForward].piece == null
	) {
		tempArray.push(targetSquare + 2 * rowForward);
	} else if (
		rowNumber == 7 &&
		board[targetSquare + 2 * rowForward].piece == null &&
		board[targetSquare + rowForward].piece == null
	) {
		tempArray.push(targetSquare + 2 * rowForward);
	}

	return tempArray.filter((n) => n < 64 && n >= 0);
};
