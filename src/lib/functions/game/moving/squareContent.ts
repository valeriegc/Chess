import type { Piece, Square } from '../../../stores/stores';

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
