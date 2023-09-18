import type { Square } from '$lib/interfaces/interfaces';
import { bishopCheck } from './bishop';
import { rookCheck } from './rook';

export const queenCheck = (targetSquare: number, board: Square[], turn: string) => {
	const towerSquares = rookCheck(targetSquare, board, turn);
	const bishopSquares = bishopCheck(targetSquare, board, turn);
	const tempArray = towerSquares.concat(bishopSquares);
	return tempArray;
};
