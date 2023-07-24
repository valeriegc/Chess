import { auth } from '$lib/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
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

const userStore = () => {
	let unsubscribe: () => void;

	if (!auth || !globalThis.window) {
		console.warn('Auth is not initialized or not in browser');
		const { subscribe } = writable<User | null>(null);
		return {
			subscribe
		};
	}

	const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
			set(user);
		});

		return () => unsubscribe();
	});

	return {
		subscribe
	};
};

export const user = userStore();
