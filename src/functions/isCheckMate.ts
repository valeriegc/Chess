import type { Square } from '../stores';
import { moveAllowedWhileCheck } from './moveChecks/checkedMoves';
import { pieceCheck } from './pieceCheck';

export const isCheckMate = (boardArr: Square[], turn: 'black' | 'white', kingLoc: number) => {
	//filter boardArr to all pieces that have same color as the player is maintaining square numbers and pieces
	const playerPieces = [];
	let checkmate = true;

	boardArr.map((n, i) => {
		if (n.piece && n.piece.color == turn) {
			playerPieces.push({
				piece: n.piece,
				squareNumber: i
			});
		}
	});
	console.log(playerPieces);
	//then check for each piece, whether it has allowed moves, while king is checked
	playerPieces.forEach((n) => {
		const currentSquare = n.squareNumber;
		const currentPiece = n.piece;
		const allowed = pieceCheck(n.piece, currentSquare, boardArr, turn);
		let actualAllowed = [];

		if (allowed.length > 0) {
			actualAllowed = allowed.filter((n) => {
				moveAllowedWhileCheck(boardArr, n, currentSquare, kingLoc, currentPiece, turn);
			});
		}
		//if allowed moves found, change checkmate to false, as player has moves
		if (actualAllowed.length > 0) checkmate = false;
	});
	console.log(checkmate);
	return checkmate;
};
