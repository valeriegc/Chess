import { db } from '$lib/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const load = async ({ cookies }) => {
	let session = cookies.get('__session');
	if (session) {
		//parser copied from https://stackoverflow.com/a/38552302
		let decoded = JSON.parse(Buffer.from(session.split('.')[1], 'base64').toString());
		let userId = decoded.user_id;

		const data = await getDoc(doc(db, 'users', userId));
		if (data.exists()) {
			const userData = data.data();
			return { userData };
		}
	}
};
