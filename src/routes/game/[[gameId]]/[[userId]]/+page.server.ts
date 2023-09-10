import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { createGameId } from './functions';
import { db } from '$lib/firebase/firebase';

export const load = async ({ params, cookies }) => {
	let gameId: string;
	if (!params.gameId) {
		gameId = createGameId();
	} else {
		gameId = params.gameId;
	}

	let userId: string;
	let session = cookies.get('__session');

	if (params.userId) {
		userId = params.userId;
	} else if (session) {
		//parser copied from https://stackoverflow.com/a/38552302
		let decoded = JSON.parse(Buffer.from(session.split('.')[1], 'base64').toString());
		userId = decoded.user_id;
	} else {
		userId = createGameId().toUpperCase();
	}

	let playerIsWhite = false;

	const gameRef = doc(db, 'games', gameId);
	const gameDoc = await getDoc(gameRef);
	const gameStarted = gameDoc.exists();
	if (gameStarted) {
		const gameData = gameDoc.data();
		playerIsWhite = userId !== gameData.black;
		if (gameData.white == '' && playerIsWhite) {
			const gameRef = doc(db, 'games', gameId);
			await updateDoc(gameRef, {
				white: userId
			});
		}
	}

	return { gameId, userId, gameStarted, playerIsWhite };
};
