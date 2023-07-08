import type { SvelteComponent } from 'svelte';
import { rowFinder, hasOpponentPiece } from '../../global';
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
	const rowForward = movingPiece == PawnB ? 8 : -8;

	if (!board[targetSquare + rowForward].occupier.component) {
		tempArray.push(targetSquare + rowForward);
	}
	if (hasOpponentPiece(targetSquare + rowForward + 1, board, turn)) {
		tempArray.push(targetSquare + rowForward + 1);
	}
	if (hasOpponentPiece(targetSquare + rowForward - 1, board, turn)) {
		tempArray.push(targetSquare + rowForward - 1);
	}
	if (
		movingPiece == PawnB &&
		rowNumber == 2 &&
		board[targetSquare + 2 * rowForward].occupier.component == null &&
		board[targetSquare + rowForward].occupier.component == null
	) {
		tempArray.push(targetSquare + 2 * rowForward);
	} else if (
		rowNumber == 7 &&
		board[targetSquare + 2 * rowForward].occupier.component == null &&
		board[targetSquare + rowForward].occupier.component == null
	) {
		tempArray.push(targetSquare + 2 * rowForward);
	}

	return tempArray;
};
