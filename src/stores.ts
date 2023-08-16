import { writable } from 'svelte/store';

export const pieceList = ['pawn', 'tower', 'horse', 'bishop', 'queen', 'king'] as const;
export type PieceType = (typeof pieceList)[number];
export interface Piece {
	type: PieceType;
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
export const gameStarted = writable(false);
