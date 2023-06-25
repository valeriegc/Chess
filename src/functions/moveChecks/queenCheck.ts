import type { Square } from '../../stores';
import { bishopCheck } from './bishopCheck';
import { towerCheck } from './towerCheck';

export const queenCheck = (targetSquare: number, board: Square[], turn: string) => {
	const towerSquares = towerCheck(targetSquare, board, turn);
	const bishopSquares = bishopCheck(targetSquare, board, turn);
	const tempArray = towerSquares.concat(bishopSquares);
	return tempArray;
};
