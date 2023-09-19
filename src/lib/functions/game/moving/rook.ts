import type { Square } from '$lib/interfaces/interfaces';
import { hasOpponentPiece, hasOwnPiece } from './squareContent';
import {
	biggestSquare,
	columnFinder,
	firstColumn,
	lastColumn,
	smallestSquare
} from './squareLocation';

export const rookCheck = (targetSquare: number, board: Square[], turn: 'black' | 'white') => {
	const columnNumber = columnFinder(targetSquare);
	const tempArray: number[] = [];
	const rowLength = 8;
	let counter = 1;

	//left

	for (let i = columnNumber; i > firstColumn; i--) {
		if (hasOwnPiece(board[targetSquare - counter].piece, turn)) break;
		else if (hasOpponentPiece(board[targetSquare - counter].piece, turn)) {
			tempArray.push(targetSquare - counter);
			break;
		} else tempArray.push(targetSquare - counter);
		counter += 1;
	}

	//right
	counter = 1;
	for (let i = columnNumber; i < lastColumn; i++) {
		if (hasOwnPiece(board[targetSquare + counter].piece, turn)) break;
		else if (hasOpponentPiece(board[targetSquare + counter].piece, turn)) {
			tempArray.push(targetSquare + counter);
			break;
		} else tempArray.push(targetSquare + counter);
		counter += 1;
	}

	//up
	for (let i = targetSquare - rowLength; i > smallestSquare; i -= rowLength) {
		if (hasOwnPiece(board[i].piece, turn)) break;
		else if (hasOpponentPiece(board[i].piece, turn)) {
			tempArray.push(i);
			break;
		} else tempArray.push(i);
	}
	//down
	for (let i = targetSquare + rowLength; i < biggestSquare; i += rowLength) {
		if (hasOwnPiece(board[i].piece, turn)) break;
		else if (hasOpponentPiece(board[i].piece, turn)) {
			tempArray.push(i);
			break;
		} else tempArray.push(i);
	}
	return tempArray;
};
