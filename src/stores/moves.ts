import { get, writable } from 'svelte/store';
import type { Piece } from '../stores';
import { columnFinder, letters, rowFinder } from '../global';

export interface Move {
	pre: number;
	post: number;
	piece: Piece;
	preCoord: string;
	postCoord: string;
}

export const moves = writable<Move[]>([]);

const alphaCalc = (i: number) => {
	let originalRowN = rowFinder(i);
	let mirroredRowN = (9 - originalRowN).toString();
	let columnId = columnFinder(i) - 1;
	let correctLetter = letters[columnId];
	return correctLetter + mirroredRowN;
};

export const addMoves = (previouspos: number, newpos: number, piece: Piece) => {
	const preAlph = alphaCalc(previouspos);
	const postAlph = alphaCalc(newpos);
	const movesStore = get(moves);
	movesStore.push({
		pre: previouspos,
		post: newpos,
		piece: piece,
		preCoord: preAlph,
		postCoord: postAlph
	});
	moves.set(movesStore);
};
