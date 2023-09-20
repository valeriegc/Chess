import type { Piece, Square } from '$lib/interfaces/interfaces';
import { pieceCheck } from '../moving/pieceCheck';
import { kingNotChecked } from './checkedMoves';

interface TempPiece {
	piece: Piece;
	squareNumber: number;
}

export const isCheckMate = (board: Square[], turn: 'black' | 'white', kingLoc: number) => {
	//filter boardArr to all pieces that have same color as the player is maintaining square numbers and pieces
	let checkMate = true;
	let pieces: TempPiece[] = [];

	board.map((n, i) => {
		if (n.piece && n.piece.color == turn) {
			pieces.push({
				piece: n.piece,
				squareNumber: i
			});
		}
	});

	//then check for each piece, whether it has allowed moves, while king is checked
	pieces.forEach((n) => {
		const currentSquare = n.squareNumber;
		const currentPiece = n.piece;
		const allowed = pieceCheck(n.piece, currentSquare, board, turn);

		allowed.map((n) => {
			if (kingNotChecked(board, n, currentSquare, kingLoc, currentPiece, turn)) checkMate = false;
		});
	});
	//if allowed moves found, change checkmate to false, as player has moves
	return checkMate;
};
