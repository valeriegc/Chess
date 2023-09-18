import { doc, getDoc, updateDoc } from 'firebase/firestore';
import type { Move } from '../stores/moves';
import { db } from '$lib/firebase/firebase';
import type { Square } from '$lib/interfaces/interfaces';

export const updateFirebase = async (gameRef, board: Square[], player: string, moves: Move[]) => {
	await updateDoc(gameRef, {
		board: board,
		player: player,
		moves: moves,
		checked: ''
	});
};
export const updateWinnerToFirebase = async (gameRef, player) => {
	await updateDoc(gameRef, {
		winner: player
	});
};
export const sendCheckToFirebase = async (gameRef, turn) => {
	await updateDoc(gameRef, {
		checked: turn
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
