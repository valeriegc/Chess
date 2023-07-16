import KingB from './pieces/King_B.svelte';
import KingW from './pieces/King_W.svelte';
import TowerB from './pieces/Tower_B.svelte';
import TowerW from './pieces/Tower_W.svelte';
import type { Square } from './stores';

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

export const hasOwnPiece = (targetSquare: number, board: Square[], turn: string) => {
	if (
		board[targetSquare].occupier.color == turn ||
		board[targetSquare].occupier.component == KingB ||
		board[targetSquare].occupier.component == KingW
	) {
		return true;
	}
	return false;
};
export const hasOpponentPiece = (targetSquare: number, board: Square[], turn: string) => {
	if (
		(board[targetSquare].occupier.color == 'black' && turn == 'white') ||
		(board[targetSquare].occupier.color == 'white' && turn == 'black')
	) {
		return true;
	}
	return false;
};
export const isKingCastling = (targetSquare: number, board: Square[], turn: string) => {
	if (turn == 'black') {
		if (board[targetSquare].occupier.component == TowerB) return true;
	} else if (board[targetSquare].occupier.component == TowerW) {
		return true;
	}
	return false;
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
export const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
export const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

export const passwordInvalid = (password: string) => {
	if (password.length < 8) return true;
	return false;
};
export const emailInvalid = (email: string) => {
	return false;
};
