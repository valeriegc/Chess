export const lastColumn = 8;
export const firstColumn = 1;
export const lastRow = 8;
export const firstRow = 1;
export const row = 8;
export const column = 1;
export const smallestSquare = 1;
export const biggestSquare = 64;
export const diagonalRowNW = -9;
export const diagonalRowNE = -7;
export const diagonalRowSW = 7;
export const diagonalRowSE = 9;
export const boardSphere = 8;

export const columnFinder = (targetSquare: number) => {
	targetSquare += 1;
	if (targetSquare % 8 == 0) return 8;
	else return targetSquare % 8;
};

export const rowFinder = (targetSquare: number) => {
	targetSquare += 1;
	return Math.ceil(targetSquare / 8);
};

export const rowOnEdge = (square: number) => {
	let rowNumber = rowFinder(square);
	if (rowNumber == 8 || rowNumber == 1) return true;
	else return false;
};

export const onBoardEdge = (direction: string, currentSquare: number) => {
	let edge = true;
	switch (direction) {
		case 'southWest':
			if (columnFinder(currentSquare) !== firstColumn && rowFinder(currentSquare) !== lastRow) {
				edge = false;
			}
			break;
		case 'southEast':
			if (rowFinder(currentSquare) !== lastRow && columnFinder(currentSquare) !== lastColumn) {
				edge = false;
			}
			break;
		case 'northEast':
			if (rowFinder(currentSquare) !== firstRow && columnFinder(currentSquare) !== lastColumn) {
				edge = false;
			}
			break;
		case 'northWest':
			if (columnFinder(currentSquare) !== firstColumn && rowFinder(currentSquare) !== firstRow) {
				edge = false;
			}
	}
	return edge;
};
