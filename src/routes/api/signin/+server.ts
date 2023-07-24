import type { RequestHandler } from './$types';
import { adminAuth } from '$lib/server/admin';
import { error, json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { idToken } = await request.json();
	const expirationIn = 60 * 60 * 24 * 7 * 1000; // 7 days
	const decodedAdminToken = await adminAuth.verifyIdToken(idToken);

	if (new Date().getTime() / 1000 - decodedAdminToken.auth_time < 5 * 60) {
		const cookie = await adminAuth.createSessionCookie(idToken, { expirationIn });
		const options = { maxAge: expirationIn, httpOnly: true, secure: true, path: '/' };
		cookies.set('__session', cookie, options);
		return json({ status: 'signedIn' });
	} else {
		throw error(401, 'Recent sign in required!');
	}
};

export const DELETE: RequestHandler = async ({ cookies }) => {
	cookies.delete('__session', { path: '/' });
	return json({ status: 'signedOut' });
};
