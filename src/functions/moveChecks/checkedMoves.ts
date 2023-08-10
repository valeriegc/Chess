import type { SvelteComponent } from 'svelte';
import type { Square } from '../../stores';
import { kingChecked } from '../kingChecked';
import PawnW from '../../pieces/Pawn_W.svelte';

export const moveAllowedWhileCheck = (
	board: Square[],
	newLoc: number,
	currentLoc: number,
	king: typeof SvelteComponent,
	kingLoc: number,
	movingComponent: typeof SvelteComponent
) => {
	let testBoard = structuredClone(board);
	let movingColor = testBoard[currentLoc].occupier.color;

	testBoard[currentLoc].occupier.color = '';
	testBoard[currentLoc].occupier.component = null;

	testBoard[newLoc].occupier.color = movingColor;
	testBoard[newLoc].occupier.component = movingComponent;

	console.log(testBoard, king, kingLoc);

	if (kingChecked(testBoard, king, kingLoc)) return false;
	return true;
};
