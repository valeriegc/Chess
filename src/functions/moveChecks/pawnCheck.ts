import type { SvelteComponent } from 'svelte';
import PawnB from '../../pieces/Pawn_B.svelte';
import { row, rowFinder, hasOwnPiece, hasOpponentPiece } from '../../global';
import type { Square } from '../../stores';

export const pawnCheck = (targetSquare: number, board: Square[], turn: string) => {
	const tempArray: number[] = [];
	const rowNumber = rowFinder(targetSquare);

	if (turn == 'black') {
		if (!board[targetSquare + row].occupier.component) {
			tempArray.push(targetSquare + row);
		}
		if (hasOpponentPiece(targetSquare + row + 1, board, turn)) {
			tempArray.push(targetSquare + row + 1);
		}
		if (hasOpponentPiece(targetSquare + row - 1, board, turn)) {
			tempArray.push(targetSquare + row - 1);
		}
		if (
			rowNumber == 2 &&
			!hasOwnPiece(targetSquare + 2 * row, board, turn) &&
			!hasOwnPiece(targetSquare + row, board, turn) &&
			!hasOpponentPiece(targetSquare + 2 * row, board, turn)
		) {
			tempArray.push(targetSquare + 2 * row);
		}
	} else {
		if (!board[targetSquare - row].occupier.component) {
			tempArray.push(targetSquare - row);
		}

		if (hasOpponentPiece(targetSquare - row + 1, board, turn)) {
			tempArray.push(targetSquare - row + 1);
		}

		if (hasOpponentPiece(targetSquare - row - 1, board, turn)) {
			tempArray.push(targetSquare - row - 1);
		}
		if (
			rowNumber == 7 &&
			!hasOwnPiece(targetSquare - 2 * row, board, turn) &&
			!hasOwnPiece(targetSquare - row, board, turn) &&
			!hasOpponentPiece(targetSquare - 2 * row, board, turn)
		) {
			tempArray.push(targetSquare - 2 * row);
		}
	}
	return tempArray;
};
