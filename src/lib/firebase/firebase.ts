import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyBvp1CgRFHZU5WQB8MuX_UUBvPqXDln1Vw',
	authDomain: 'chess-dev-aa3eb.firebaseapp.com',
	projectId: 'chess-dev-aa3eb',
	storageBucket: 'chess-dev-aa3eb.appspot.com',
	messagingSenderId: '587967618814',
	appId: '1:587967618814:web:299748f262dcb55d1d8faf'
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
