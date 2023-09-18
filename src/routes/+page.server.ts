import { db } from '$lib/firebase/firebase.js';
import { adminAuth } from '$lib/server/admin.js';
import { fail } from '@sveltejs/kit';
import { doc, setDoc } from 'firebase/firestore';
import { passwordInvalid } from '$lib/functions/signin/pwValidator';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const confirmPassword = data.get('confirmPassword');

		if (!email || !password || !confirmPassword) {
			return fail(400, { detailsMissing: true });
		}
		const invalidPw = passwordInvalid(password);
		if (invalidPw) {
			return fail(400, { passwordError: invalidPw });
		}
		const passwordMismatch = password !== confirmPassword;
		if (passwordMismatch) {
			return fail(400, { passwordMismatch: true });
		}

		adminAuth
			.createUser({
				email: email,
				password: password
			})
			.then(async (userRecord) => {
				await setDoc(doc(db, 'users', userRecord.uid), {
					email: userRecord.email,
					userName: userRecord.displayName,
					picture: '',
					played: 0,
					lost: 0,
					won: 0
				});
				return { success: true };
			})
			.catch((error) => {
				console.log('Error creating new user:', error);
			});
	}
};
