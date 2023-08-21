import { initializeApp } from 'firebase/app';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { writable } from 'svelte/store';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBvp1CgRFHZU5WQB8MuX_UUBvPqXDln1Vw',
	authDomain: 'chess-dev-aa3eb.firebaseapp.com',
	projectId: 'chess-dev-aa3eb',
	storageBucket: 'chess-dev-aa3eb.appspot.com',
	messagingSenderId: '587967618814',
	appId: '1:587967618814:web:299748f262dcb55d1d8faf'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

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
