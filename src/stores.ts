import type { SvelteComponent } from 'svelte';
import { writable } from 'svelte/store';
export interface Square {
	coords: string;
	occupier: {
		component: typeof SvelteComponent | null;
		color: string;
	};
}
export interface Move {
	pre: number;
	post: number;
	component: typeof SvelteComponent | null;
}
export const moves = writable<Move[]>([]);
