import {
	column,
	firstColumn,
	lastColumn,
	row,
	columnFinder,
	smallestSquare,
	biggestSquare,
	hasOwnPiece
} from '../../global';
import type { Square } from '../../stores';
import { canKingCastle } from './castlingCheck';

export const kingCheck = (targetSquare: number, board: Square[], turn: string) => {
	const tempArrayLimited: number[] = [];
	const columnNumber = columnFinder(targetSquare);

	switch (columnNumber) {
		case firstColumn:
			tempArrayLimited.push(
				targetSquare + column,
				targetSquare - row,
				targetSquare + row,
				targetSquare - row + 1,
				targetSquare + row + 1
			);
			break;
		case lastColumn:
			tempArrayLimited.push(
				targetSquare - column,
				targetSquare - row,
				targetSquare + row,
				targetSquare - row - 1,
				targetSquare + row - 1
			);
			break;
		default:
			tempArrayLimited.push(
				targetSquare - column,
				targetSquare + column,
				targetSquare + row,
				targetSquare - row,
				targetSquare - row + 1,
				targetSquare + row + 1,
				targetSquare - row - 1,
				targetSquare + row - 1
			);
	}
	const tempArray = tempArrayLimited.filter((n) => n > smallestSquare && n < biggestSquare);
	const castles = canKingCastle(targetSquare, board, turn);
	console.log(castles);
	const tempArray2 = tempArray.filter((n) => !hasOwnPiece(n, board, turn));
	if (castles.length > 0) {
		castles.forEach((n) => tempArray2.push(n));
	}
	return tempArray2;
};
