import type { SvelteComponent } from 'svelte';
import { allowedSquares } from '../../stores';
import PawnB from '../../pieces/Pawn_B.svelte';
import { row, rowFinder } from '../../global';

export const pawnCheck = (targetSquare: number, movingPiece: typeof SvelteComponent) => {
	const tempArray: number[] = [];
	const rowNumber = rowFinder(targetSquare);

	if (movingPiece == PawnB) {
		tempArray.push(targetSquare + row);
		if (rowNumber == 2) tempArray.push(targetSquare + 2 * row);
	} else {
		tempArray.push(targetSquare - row);
		if (rowNumber == 7) tempArray.push(targetSquare - 2 * row);
	}
	return tempArray;
};
