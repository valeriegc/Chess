import {
	diagonalRowNE,
	diagonalRowSW,
	rowFinder,
	firstColumn,
	columnFinder,
	lastColumn,
	lastRow,
	firstRow,
	diagonalRowSE,
	diagonalRowNW
} from '../../global';

export const bishopCheck = (targetSquare: number) => {
	const tempArray: number[] = [];
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
