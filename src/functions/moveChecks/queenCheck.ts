import {
	biggestSquare,
	columnFinder,
	firstColumn,
	firstRow,
	lastColumn,
	lastRow,
	rowFinder,
	smallestSquare,
	diagonalRowNE,
	diagonalRowNW,
	diagonalRowSE,
	diagonalRowSW
} from '../../global';

export const queenCheck = (targetSquare: number) => {
	const columnNumber = columnFinder(targetSquare);
	const tempArray: number[] = [];
	let counter = 1;

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
	for (let i = targetSquare; i >= smallestSquare; i -= lastColumn) {
		tempArray.push(i);
	}

	for (let i = targetSquare; i <= biggestSquare; i += lastColumn) {
		tempArray.push(i);
	}

	// diagonal checks
	const startSquare = targetSquare;
	let currentSquare = targetSquare;

	if (columnFinder(currentSquare) !== firstColumn && rowFinder(currentSquare) !== lastRow) {
		for (let i = 0; i < 8; i++) {
			currentSquare = currentSquare + diagonalRowSW;
			if (columnFinder(currentSquare) == firstColumn || rowFinder(currentSquare) == lastRow) i = 8;
			tempArray.push(currentSquare);
		}
	}
	currentSquare = targetSquare;

	if (rowFinder(currentSquare) !== lastRow && columnFinder(currentSquare) !== lastColumn) {
		for (let i = 0; i < 8; i++) {
			currentSquare = currentSquare + diagonalRowSE;
			if (columnFinder(currentSquare) == lastColumn || rowFinder(currentSquare) == 8) i = 8;
			tempArray.push(currentSquare);
		}
	}
	currentSquare = targetSquare;

	if (rowFinder(currentSquare) !== firstRow && columnFinder(currentSquare) !== lastColumn) {
		for (let i = 0; i < 8; i++) {
			currentSquare = currentSquare + diagonalRowNE;
			if (columnFinder(currentSquare) == lastColumn || rowFinder(currentSquare) == firstRow) i = 8;
			tempArray.push(currentSquare);
		}
	}
	currentSquare = targetSquare;

	if (columnFinder(currentSquare) !== firstColumn && rowFinder(currentSquare) !== firstRow) {
		for (let i = 0; i < 8; i++) {
			currentSquare = currentSquare + diagonalRowNW;
			if (columnFinder(currentSquare) == firstColumn || rowFinder(currentSquare) == firstRow) i = 8;
			tempArray.push(currentSquare);
		}
	}

	return tempArray.filter((n) => n !== startSquare).sort((a, b) => a - b);
};
