import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import type { SvelteComponent } from 'svelte';
import { writable } from 'svelte/store';
import { auth } from './firebase/firebase';

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
