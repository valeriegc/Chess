import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase/firestore';
import {
	C_CLIENT_EMAIL,
	C_PROJECT_ID,
	C_PRIVATE_KEY,
	C_FIREBASE_SERVICE_ACCOUNT
} from '$env/static/private';
import pkg from 'firebase-admin';

try {
	pkg.initializeApp({
		credential: pkg.credential.cert({
			projectId: C_PROJECT_ID,
			clientEmail: C_CLIENT_EMAIL,
			privateKey: C_PRIVATE_KEY
		})
	});
} catch (err: any) {
	if (!/already exists/.test(err.message)) {
		console.error('Firebase Admin Error: ', err.stack);
	}
}

//export const adminDB = getFirestore();
export const adminAuth = getAuth();
