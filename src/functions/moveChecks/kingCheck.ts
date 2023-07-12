import {
	column,
	firstColumn,
	lastColumn,
	row,
	columnFinder,
	biggestSquare,
	hasOwnPiece
} from '../../global';
import KingB from '../../pieces/King_B.svelte';
import KingW from '../../pieces/King_W.svelte';
import TowerB from '../../pieces/Tower_B.svelte';
import TowerW from '../../pieces/Tower_W.svelte';
import type { Square } from '../../stores';
import { castlingCheck } from './castlingCheck';

export const kingCheck = (kingLoc: number, board: Square[], turn: string) => {
	const kingColumn = columnFinder(kingLoc);
	let kingArray = [];
	const king = turn == 'black' ? KingB : KingW;
	const tower = turn == 'black' ? TowerB : TowerW;
	const allKingMoves = [
		kingLoc - column,
		kingLoc + column,
		kingLoc + row,
		kingLoc - row,
		kingLoc - row + 1,
		kingLoc + row + 1,
		kingLoc - row - 1,
		kingLoc + row - 1
	];
	let kingMovesOnBoard = [];

	kingMovesOnBoard = allKingMoves.filter((n) => n >= 0 && n < biggestSquare);

	if (kingColumn == firstColumn) {
		kingArray = kingMovesOnBoard.filter(
			(n) => columnFinder(n) !== lastColumn && !hasOwnPiece(n, board, turn)
		);
	} else if (kingColumn == lastColumn) {
		kingArray = kingMovesOnBoard.filter(
			(n) => columnFinder(n) !== firstColumn && !hasOwnPiece(n, board, turn)
		);
	} else {
		kingArray = kingMovesOnBoard.filter((n) => !hasOwnPiece(n, board, turn));
	}
	const castleSquares = castlingCheck(king, tower, board);
	console.log(kingArray);
	castleSquares?.forEach((n) => kingArray.push(n));
	return kingArray;
};
