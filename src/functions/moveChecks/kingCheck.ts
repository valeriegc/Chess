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

export const kingCheck = (targetSquare: number, board: Square[], turn: string) => {
	const tempArrayLimited: number[] = [];
	const columnNumber = columnFinder(targetSquare);
	switch (columnNumber) {
		case firstColumn:
			tempArrayLimited.push(
				targetSquare + column,
				targetSquare - row,
				targetSquare + row,
				targetSquare - row + 1,
				targetSquare + row + 1
			);
			break;
		case lastColumn:
			tempArrayLimited.push(
				targetSquare - column,
				targetSquare - row,
				targetSquare + row,
				targetSquare - row - 1,
				targetSquare + row - 1
			);
			break;
		default:
			tempArrayLimited.push(
				targetSquare - column,
				targetSquare + column,
				targetSquare + row,
				targetSquare - row,
				targetSquare - row + 1,
				targetSquare + row + 1,
				targetSquare - row - 1,
				targetSquare + row - 1
			);
	}
	const king = turn == 'black' ? KingB : KingW;
	const tower = turn == 'black' ? TowerB : TowerW;
	const castleArr = castlingCheck(king, tower, board);
	castleArr?.forEach((n) => tempArrayLimited.push(n));
	const tempArray = tempArrayLimited.filter((n) => n >= 0 && n < biggestSquare);
	return tempArray.filter((n) => castleArr?.includes(n) || !hasOwnPiece(n, board, turn));
};
