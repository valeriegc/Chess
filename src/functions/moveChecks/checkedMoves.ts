import type { Piece, Square } from '../../stores';
import { kingChecked } from '../kingChecked';

export const moveAllowedWhileCheck = (
	board: Square[],
	newLoc: number,
	currentLoc: number,
	kingLoc: number,
	movingComponent: Piece,
	turn: 'black' | 'white'
) => {
	let testBoard = JSON.parse(JSON.stringify(board));
	let movingColor = testBoard[currentLoc].piece.color;

	testBoard[currentLoc].occupier.color = '';
	testBoard[currentLoc].occupier.component = null;

	testBoard[newLoc].occupier.color = movingColor;
	testBoard[newLoc].occupier.component = movingComponent;

	if (kingChecked(testBoard, { type: 'king', color: turn }, kingLoc)) return false;
	return true;
};
