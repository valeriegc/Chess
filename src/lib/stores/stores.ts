import type { Resign } from '$lib/interfaces/interfaces';
import type { User } from 'firebase/auth';
import { writable } from 'svelte/store';

export const gameId = writable<string>();
export let startOpen = writable('true');
export const url = writable('');
export const authenticated = writable({
	data: {},
	user: null,
	fetching: true
});
export const gameStarted = writable(false);
export const player = writable<'white' | 'black'>('white');
export const userStore = writable<User | null>(null);
export const userId = writable<string>();
export const waiting = writable(true);
export const resign = writable<Resign>({
	resigned: false,
	resigner: ''
});
export const winner = writable('');
export const userPic = writable('');
