import KingB from '../../pieces/King_B.svelte';
import KingW from '../../pieces/King_W.svelte';
import type { Square } from '../../stores';
import { kingChecked } from '../kingChecked';
import { get } from 'svelte/store';
import { moveArr } from '../../stores';
import TowerB from '../../pieces/Tower_B.svelte';
import TowerW from '../../pieces/Tower_W.svelte';

export const canKingCastle = (targetSquare: number, board: Square[], turn: string) => {
	// check if tower in the corner and nothing in between king and the tower
	const previousMoves = get(moveArr);
	console.log(previousMoves);
	let castlingSquares = [];
	const king = turn == 'white' ? KingW : KingB;
	/**if (kingChecked(board, king, targetSquare)) return castlingSquares;
	if (previousMoves.some((m) => m.piece == king)) return castlingSquares;**/
	if (king == KingB) {
		//first tower
		if (
			board[1].occupier == null &&
			board[2].occupier == null &&
			board[3].occupier == null &&
			!previousMoves.some((m) => {
				m.piece == TowerB, m.oldCoord == 0;
			})
		) {
			if (
				!kingChecked(board, king, 1) &&
				!kingChecked(board, king, 2) &&
				!kingChecked(board, king, 3)
			) {
				console.log('hello1');
				castlingSquares.push(0);
			}
		}
		//second tower
		else if (
			board[5].occupier == null &&
			board[6].occupier == null &&
			!previousMoves.some((m) => {
				m.piece == TowerB, m.oldCoord == 7;
			})
		) {
			if (!kingChecked(board, king, 5) && !kingChecked(board, king, 6)) {
				console.log('hello2');
				castlingSquares.push(7);
			}
		}
	} else if (king == KingW) {
		console.log('no premature return');
		if (
			board[57].occupier == null &&
			board[58].occupier == null &&
			board[59].occupier == null &&
			!previousMoves.some((m) => {
				m.piece == TowerW, m.oldCoord == 56;
			})
		) {
			if (
				!kingChecked(board, king, 57) &&
				!kingChecked(board, king, 58) &&
				!kingChecked(board, king, 59)
			) {
				castlingSquares.push(56);
			}
		}
		if (
			board[60].occupier == null &&
			board[61].occupier == null &&
			board[62].occupier == null &&
			!previousMoves.some((m) => {
				m.piece == TowerW, m.oldCoord == 63;
			})
		) {
			if (
				!kingChecked(board, king, 60) &&
				!kingChecked(board, king, 61) &&
				!kingChecked(board, king, 62)
			) {
				castlingSquares.push(63);
			}
		}
	}
	console.log(king, turn);
	return castlingSquares;
};
