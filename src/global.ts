import type { Piece } from './stores';

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

export const hasOwnPiece = (squareContent: Piece | null, turn: string) => {
	if (!squareContent) return false;
	else if (squareContent.color !== turn) return false;
	return true;
};
export const hasOpponentPiece = (squareContent: Piece | null, turn: string) => {
	if (!squareContent) return false;
	else if (squareContent.color == turn) return false;
	return true;
};
export const isKingCastling = (squareContent: Piece | null, turn: string) => {
	if (squareContent == null) return false;
	if (squareContent.type == 'tower' && squareContent.color == turn) return true;
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

export const alphaCalc = (i: number) => {
	let rowNumber = rowFinder(i).toString();
	let columnId = columnFinder(i) - 1;
	let correctLetter = letters[columnId];
	return correctLetter + rowNumber;
};
export const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const;
export const numbers = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export const passwordInvalid = (password: string) => {
	if (password.length < 8) return true;
	return false;
};
export const emailInvalid = (email: string) => {
	return false;
};
