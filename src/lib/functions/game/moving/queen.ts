import type { Square } from '../../../stores/stores';
import { bishopCheck } from './bishop';
import { towerCheck } from './rook';

export const queenCheck = (targetSquare: number, board: Square[], turn: string) => {
	const towerSquares = towerCheck(targetSquare, board, turn);
	const bishopSquares = bishopCheck(targetSquare, board, turn);
	const tempArray = towerSquares.concat(bishopSquares);
	return tempArray;
};
