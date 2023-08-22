import { goto } from '$app/navigation';
import { db } from '$lib/firebase/firebase.js';
import { adminAuth } from '$lib/server/admin.js';
import { fail } from '@sveltejs/kit';
import { doc, setDoc } from 'firebase/firestore';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const confirmPassword = data.get('confirmPassword');

		if (!email || !password || !confirmPassword) {
			return fail(400, { detailsMissing: true });
		}
		adminAuth
			.createUser({
				email: email,
				password: password
			})
			.then(async (userRecord) => {
				await setDoc(doc(db, 'users', userRecord.uid), {
					email: userRecord.email,
					theme: 'bw',
					picture: '',
					played: 0,
					lost: 0,
					won: 0
				});
			})
			.catch((error) => {
				console.log('Error creating new user:', error);
			});
	}
};
