import {
	lastColumn,
	columnFinder,
	biggestSquare,
	firstColumn,
	smallestSquare,
	hasOpponentPiece,
	hasOwnPiece
} from '../../../global';
import type { Square } from '../../../stores/stores';

export const towerCheck = (targetSquare: number, board: Square[], turn: string) => {
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
