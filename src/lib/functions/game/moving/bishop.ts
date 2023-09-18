import {
	hasOwnPiece,
	hasOpponentPiece,
	onBoardEdge,
	boardSphere,
	diagonalRowSW,
	diagonalRowSE,
	diagonalRowNE,
	diagonalRowNW
} from '../../../global';
import type { Square } from '../../../stores/stores';

export const bishopCheck = (currentLoc: number, board: Square[], turn: string) => {
	const diagonalRowBuilder = (direction: string, currentLoc: number, diagonalDistance: number) => {
		let tempArray = [];
		if (!onBoardEdge(direction, currentLoc)) {
			for (let i = 0; i < boardSphere; i++) {
				currentLoc = currentLoc + diagonalDistance;
				if (onBoardEdge(direction, currentLoc)) i = boardSphere;
				if (hasOwnPiece(board[currentLoc].piece, turn)) break;
				if (hasOpponentPiece(board[currentLoc].piece, turn)) {
					tempArray.push(currentLoc);
					break;
				}
				tempArray.push(currentLoc);
			}
		}
		return tempArray;
	};
	const southWestSquares = diagonalRowBuilder('southWest', currentLoc, diagonalRowSW);
	const southEastSquares = diagonalRowBuilder('southEast', currentLoc, diagonalRowSE);
	const northEastSquares = diagonalRowBuilder('northEast', currentLoc, diagonalRowNE);
	const northWestSquares = diagonalRowBuilder('northWest', currentLoc, diagonalRowNW);
	const bishopSquares = southWestSquares.concat(
		northWestSquares,
		northEastSquares,
		southEastSquares
	);
	return bishopSquares.filter((n) => n !== currentLoc);
};
