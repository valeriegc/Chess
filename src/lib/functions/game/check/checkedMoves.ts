import type { Piece, Square } from '$lib/interfaces/interfaces';
import { kingChecked } from './kingChecked';

export const moveAllowedWhileCheck = (
	board: Square[],
	newLoc: number,
	currentLoc: number,
	kingLoc: number,
	movingPiece: Piece,
	turn: 'black' | 'white'
) => {
	let testBoard = JSON.parse(JSON.stringify(board));
	testBoard[currentLoc].piece = null;
	testBoard[newLoc].piece = { type: movingPiece.type, color: movingPiece.color };

	if (movingPiece.type == 'king') {
		if (kingChecked(testBoard, { type: 'king', color: turn }, newLoc)) return false;
		else return true;
	} else {
		if (kingChecked(testBoard, { type: 'king', color: turn }, kingLoc)) return false;
		else return true;
	}
};
