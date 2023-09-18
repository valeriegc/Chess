import { writable } from 'svelte/store';

export const gameId = writable<string>();
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

export interface User {
	email: string;
	picture: string;
	lost: number;
	won: number;
	played: number;
	uid: string;
}

export let startOpen = writable('true');
export const url = writable('');
export const authenticated = writable({
	data: {},
	user: null,
	fetching: true
});
export const gameStarted = writable(false);
export const player = writable('white');
export const userStore = writable<User | null>(null);
export const userId = writable<string>();
export const waiting = writable(true);

export interface Resign {
	resigned: boolean;
	resigner: string;
}
export const resign = writable<Resign>({
	resigned: false,
	resigner: ''
});
export const winner = writable('');
export const userPic = writable('');
