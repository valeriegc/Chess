import type { SvelteComponent, SvelteComponentTyped } from 'svelte';
import { writable } from 'svelte/store';
export interface Square {
	number: number;
	coords: string;
	occupier: {
		component: typeof SvelteComponent | null;
		color: string;
	};
}
export const boardArr = writable<Square[]>([]);
export const selectedSquare = writable(-1);
export const allowedSquares = writable<number[]>([]);
export const turn = writable('white');
