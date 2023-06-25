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

export const columnFinder = (targetSquare: number) => {
	if (targetSquare % 8 == 0) return 8;
	else return targetSquare % 8;
};

export const rowFinder = (targetSquare: number) => {
	return Math.ceil(targetSquare / 8);
};

export const hasOwnPiece = (targetSquare: number, board, turn) => {
	if (board[targetSquare - 1].occupier.color == turn) return true;
	return false;
};
export const hasOpponentPiece = (targetSquare: number, boardArr, turn) => {
	const board = boardArr;
	if (
		(board[targetSquare - 1].occupier.color == 'black' && turn == 'white') ||
		(board[targetSquare - 1].occupier.color == 'white' && turn == 'black')
	) {
		return true;
	}
	return false;
};
