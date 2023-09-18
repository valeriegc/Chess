import { doc, getDoc, updateDoc } from 'firebase/firestore';
import type { Square } from './stores';
import type { Move } from './stores/moves';
import { db } from '$lib/firebase/firebase';

export const updateFirebase = async (gameRef, board: Square[], player: string, moves: Move[]) => {
	await updateDoc(gameRef, {
		board: board,
		player: player,
		moves: moves
	});
};
export const updateWinnerToFirebase = async (gameRef, winner) => {
	await updateDoc(gameRef, {
		winner: winner
	});
};

export const updateFirebaseStats = async (player, winner, userId) => {
	const playerWon = player == winner;
	const userData = await getDoc(doc(db, 'users', userId));
	const specifics = userData.data();
	if (specifics) {
		let lost = specifics.lost;
		let won = specifics.won;
		if (playerWon) {
			won += 1;
		}
		if (!playerWon) {
			lost += 1;
		}
		await updateDoc(doc(db, 'users', userId), {
			lost: lost,
			won: won
		});
	}
};
export const sendCheckToFirebase = async (gameRef, player) => {
	await updateDoc(gameRef, {
		checked: player == 'white' ? 'black' : 'white'
	});
};
