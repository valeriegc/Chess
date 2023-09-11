import { doc, updateDoc } from 'firebase/firestore';
import type { Piece, Square } from './stores';
import { db } from '$lib/firebase/firebase';

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
	let originalRowN = rowFinder(i);
	let mirroredRowN = (9 - originalRowN).toString();
	let columnId = columnFinder(i) - 1;
	let correctLetter = letters[columnId];
	return correctLetter + mirroredRowN;
};
export const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const;
export const numbers = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export const passwordInvalid = (password: string) => {
	let errors = [];
	let specialCh = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
	let hasUpper = /[A-Z]/.test(password);
	let hasLower = /[a-z]/.test(password);

	if (password.length < 8) errors.push('be minimum 8 characters long');
	if (!hasUpper || !hasLower) errors.push('contain both uppercase and lowercase letters');
	if (!specialCh.test(password)) errors.push('contain at least 1 special character');
	if (errors.length == 0) return false;
	else if (errors.length == 1) return `The password must ${errors[0]}.`;
	else if (errors.length == 2) return `The password must ${errors[0]} and ${errors[1]}.`;
	else return `The password must ${errors[0]}, ${errors[1]} and ${errors[2]}.`;
};

export interface FillSquare {
	piece: Piece;
	square: number;
}

export const darkSquares = [
	1, 3, 5, 7, 8, 10, 12, 14, 17, 19, 21, 23, 24, 26, 28, 30, 33, 35, 37, 39, 40, 42, 44, 46, 49, 51,
	53, 55, 56, 58, 60, 62, 64
];

export const getCastleLocations = (oldTowerLoc: number, oldKingLoc: number) => {
	let newKingLoc;
	let newTowerLoc;
	const castleToRight = oldTowerLoc > oldKingLoc;

	if (castleToRight) {
		newKingLoc = oldTowerLoc - 1;
		newTowerLoc = oldTowerLoc - 2;
	} else {
		newKingLoc = oldTowerLoc + 1;
		newTowerLoc = oldTowerLoc + 2;
	}
	return { tower: newTowerLoc, king: newKingLoc };
};

export const invalidSelection = (
	boardArr: Square[],
	newSquare: number,
	turn: 'black' | 'white'
) => {
	const emptySquare = boardArr[newSquare].piece == null;
	const opponentPiece = boardArr[newSquare].piece?.color !== turn;

	if (emptySquare || opponentPiece) return true;
	else return false;
};
export const findKing = (board: Square[], turn: 'black' | 'white') => {
	return board.findIndex((n) => n.piece?.type == 'king' && n.piece.color == turn);
};
export const numbersWhite = [8, 7, 6, 5, 4, 3, 2, 1];
export const numbersBlack = [1, 2, 3, 4, 5, 6, 7, 8];
