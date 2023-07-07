import type { SvelteComponent } from 'svelte';
import { row, rowFinder, hasOwnPiece, hasOpponentPiece } from '../../global';
import type { Square } from '../../stores';
import PawnB from '../../pieces/Pawn_B.svelte';

export const pawnCheck = (
	targetSquare: number,
	board: Square[],
	turn: string,
	movingPiece: typeof SvelteComponent
) => {
	const tempArray: number[] = [];
	const rowNumber = rowFinder(targetSquare);
	console.log(turn, targetSquare);
	if (movingPiece == PawnB) {
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
