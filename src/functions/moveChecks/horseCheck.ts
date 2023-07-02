import { columnFinder, column, hasOwnPiece } from '../../global';
import type { Square } from '../../stores';

export const horseCheck = (targetSquare: number, boardArr: Square[], turn: string) => {
	const startColumnNumber = columnFinder(targetSquare);

	const plusOneRow = [-15, 17];
	const plusTwoRow = [-6, 10];
	const minusOneRow = [-17, 15];
	const minusTwoRow = [6, -10];
	const tempArray: number[] = [];

	plusOneRow.forEach((n) => {
		if (columnFinder(targetSquare + n) == startColumnNumber + column) {
			tempArray.push(targetSquare + n);
		}
	});
	plusTwoRow.forEach((n) => {
		if (columnFinder(targetSquare + n) == startColumnNumber + 2 * column) {
			tempArray.push(targetSquare + n);
		}
	});
	minusOneRow.forEach((n) => {
		if (columnFinder(targetSquare + n) == startColumnNumber - column) {
			tempArray.push(targetSquare + n);
		}
	});
	minusTwoRow.forEach((n) => {
		if (columnFinder(targetSquare + n) == startColumnNumber - 2 * column) {
			tempArray.push(targetSquare + n);
		}
	});
	const tempArrayLimited = tempArray.filter((n) => n > 0 && n < 64);
	return tempArrayLimited.filter((n) => !hasOwnPiece(n, boardArr, turn));
};
