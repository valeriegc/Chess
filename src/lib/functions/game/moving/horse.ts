import type { Square } from '$lib/interfaces/interfaces';
import { hasOwnPiece } from './squareContent';
import { columnFinder } from './squareLocation';

export const horseCheck = (currentLoc: number, boardArr: Square[], turn: string) => {
	const startColumnNumber = columnFinder(currentLoc);
	let allHorseMoves = [
		currentLoc - 15,
		currentLoc + 17,
		currentLoc - 6,
		currentLoc + 10,
		currentLoc - 17,
		currentLoc + 15,
		currentLoc + 6,
		currentLoc - 10
	];
	allHorseMoves = allHorseMoves.filter((n) => n >= 0 && n < 64);

	const columnOnTheBoard = (n: number) => {
		if (
			columnFinder(n) == startColumnNumber + 1 ||
			columnFinder(n) == startColumnNumber + 2 ||
			columnFinder(n) == startColumnNumber - 1 ||
			columnFinder(n) == startColumnNumber - 2
		) {
			return true;
		}
		return false;
	};
	let validHorseMoves: number[] = [];

	allHorseMoves.forEach((n) => {
		if (columnOnTheBoard(n) && !hasOwnPiece(boardArr[n].piece, turn)) {
			validHorseMoves.push(n);
		}
	});
	return validHorseMoves;
};
