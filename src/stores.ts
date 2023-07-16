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
export const authentificated = writable({
	data: {},
	user: null,
	fetching: true
});
export const authMethods = {
	loginUser: async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password);
	},
	logOutUser: async () => {
		await signOut(auth);
	},
	createUser: async (email: string, password: string) => {
		await createUserWithEmailAndPassword(auth, email, password);
	}
};
