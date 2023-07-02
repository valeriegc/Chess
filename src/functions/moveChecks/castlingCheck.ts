import { get } from 'svelte/store';
import { moves, type Square } from '../../stores';
import KingB from '../../pieces/King_B.svelte';
import type { SvelteComponent } from 'svelte';
import KingW from '../../pieces/King_W.svelte';
import { kingCheck } from './kingCheck';
import { kingChecked } from '../kingChecked';

export const castlingCheck = (
	king: typeof SvelteComponent,
	tower: typeof SvelteComponent,
	board: Square[]
) => {
	let castleSquares: number[];
	castleSquares = [];
	const pastMoves = get(moves);
	//return if past moves includes King
	if (pastMoves.find((n) => n.component == king)) return castleSquares;
	//checks for black king
	if (king == KingB) {
		//check for black, square 0
		if (!pastMoves.find((n) => n.component == tower && n.pre == 0)) {
			if (
				board[1].occupier.component == null &&
				board[2].occupier.component == null &&
				board[3].occupier.component == null
			) {
				if (
					!kingChecked(board, king, 1) &&
					!kingChecked(board, king, 2) &&
					!kingChecked(board, king, 3)
				) {
					castleSquares.push(0);
				}
			}
			if (!pastMoves.find((n) => n.component == tower && n.pre == 7)) {
				if (board[5].occupier.component == null && board[6].occupier.component == null) {
					if (!kingChecked(board, king, 5) && !kingChecked(board, king, 6)) {
						castleSquares.push(7);
					}
				}
			}
		}
	}
	if (king == KingW) {
		if (!pastMoves.find((n) => n.component == tower && n.pre == 56)) {
			if (
				board[57].occupier.component == null &&
				board[58].occupier.component == null &&
				board[59].occupier.component == null
			) {
				if (
					!kingChecked(board, king, 57) &&
					!kingChecked(board, king, 58) &&
					!kingChecked(board, king, 59)
				) {
					castleSquares.push(56);
				}
			}
			if (!pastMoves.find((n) => n.component == tower && n.pre == 63)) {
				if (board[61].occupier.component == null && board[62].occupier.component == null) {
					if (!kingChecked(board, king, 61) && !kingChecked(board, king, 62)) {
						castleSquares.push(63);
					}
				}
			}
		}
	}
	console.log(castleSquares);
};
