import { writable } from 'svelte/store';

export interface Piece {
	type: (typeof pieceList)[number];
	color: 'black' | 'white';
}
export interface Square {
	coords: string;
	piece: Piece | null;
}
export interface Move {
	pre: number;
	post: number;
	piece: Piece;
	preCoord: string;
	postCoord: string;
}

export const moves = writable<Move[]>([]);
export let startOpen = writable('true');
export const url = writable('');
export const authenticated = writable({
	data: {},
	user: null,
	fetching: true
});
export const pieceList = ['pawn', 'tower', 'horse', 'bishop', 'queen', 'king'] as const;
