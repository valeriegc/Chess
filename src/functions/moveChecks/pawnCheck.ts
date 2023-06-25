import type { SvelteComponent } from 'svelte';
import PawnB from '../../pieces/Pawn_B.svelte';
import { row, rowFinder, hasOwnPiece, hasOpponentPiece } from '../../global';
import type { Square } from '../../stores';

export const pawnCheck = (
	targetSquare: number,
	movingPiece: typeof SvelteComponent,
	boardArr: Square[],
	turn: string
) => {
	const tempArray: number[] = [];
	const rowNumber = rowFinder(targetSquare);

	if (movingPiece == PawnB) {
		if (!hasOwnPiece(targetSquare + row, boardArr, turn)) {
			tempArray.push(targetSquare + row);
		}
		if (hasOpponentPiece(targetSquare + row + 1, boardArr, turn)) {
			tempArray.push(targetSquare + row + 1);
		}
		if (hasOpponentPiece(targetSquare + row - 1, boardArr, turn)) {
			tempArray.push(targetSquare + row - 1);
		}
		if (rowNumber == 2 && !hasOwnPiece(targetSquare + 2 * row, boardArr, turn)) {
			tempArray.push(targetSquare + 2 * row);
		}
	} else {
		if (!hasOwnPiece(targetSquare - row, boardArr, turn)) {
			tempArray.push(targetSquare - row);
		}
		if (hasOpponentPiece(targetSquare - row + 1, boardArr, turn)) {
			tempArray.push(targetSquare - row + 1);
		}
		if (hasOpponentPiece(targetSquare - row - 1, boardArr, turn)) {
			tempArray.push(targetSquare - row - 1);
		}
		if (rowNumber == 7 && !hasOwnPiece(targetSquare - 2 * row, boardArr, turn)) {
			tempArray.push(targetSquare - 2 * row);
		}
	}
	return tempArray;
};
