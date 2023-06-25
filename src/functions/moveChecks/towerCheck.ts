import { lastColumn, columnFinder, biggestSquare, firstColumn, smallestSquare } from '../../global';

export const towerCheck = (targetSquare: number, board) => {
	const boardArr = board;
	const columnNumber = columnFinder(targetSquare);
	const tempArray: number[] = [];
	const rowLength = 8;
	let counter = 1;
	console.log(boardArr);
	//horizontal checks

	for (let i = columnNumber; i > firstColumn; i--) {
		tempArray.push(targetSquare - counter);
		counter += 1;
	}
	counter = 1;
	for (let i = columnNumber; i < lastColumn; i++) {
		tempArray.push(targetSquare + counter);
		counter += 1;
	}

	//vertical checks
	for (let i = targetSquare; i >= smallestSquare; i -= rowLength) {
		tempArray.push(i);
	}

	for (let i = targetSquare; i <= biggestSquare; i += rowLength) {
		tempArray.push(i);
	}

	return tempArray.filter((n) => n !== targetSquare);
};
