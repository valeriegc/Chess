import { createGameId } from './functions';

export const load = ({ params, cookies }) => {
	let gameId: string;
	if (!params.gameId) {
		gameId = createGameId();
	} else {
		gameId = params.gameId;
	}

	let userId: string;
	let session = cookies.get('__session');

	if (session) {
		//parser copied from https://stackoverflow.com/a/38552302
		let decoded = JSON.parse(Buffer.from(session.split('.')[1], 'base64').toString());
		userId = decoded.user_id;
	} else {
		userId = createGameId().toUpperCase();
	}

	return { gameId, userId };
};
