import { writable } from 'svelte/store';

export const gameId = writable('NoIdYet');
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
export interface User {
	email: string;
	picture: string;
	theme: string;
	lost: number;
	won: number;
	played: number;
	uid: string;
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
export const player = writable('white');
export const theme = writable('bw');
export const userStore = writable<User | null>(null);
export const waiting = writable(true);
export const messages = writable<Msg[]>([]);
