import { adminAuth } from '$lib/server/admin.js';
import { fail } from '@sveltejs/kit';

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
			.then((userRecord) => {
				console.log('user created with id:', userRecord.uid);
			})
			.catch((error) => {
				console.log('Error creating new user:', error);
			});
	}
};
