import { updateFirebaseStats, updateWinnerToFirebase } from '$lib/firebase/firebaseUpdate';
import type { Square } from '$lib/interfaces/interfaces';
import { userId as id } from '$lib/stores/stores';
import { get } from 'svelte/store';
import { isCheckMate } from '../check/isCheckMate';
import { findKing } from '../moving/squareContent';

export const checkForWinner = async (boardArr: Square[], turn, player, gameRef) => {
	let kingLocation = findKing(boardArr, turn);
	const checkMate = isCheckMate(boardArr, turn, kingLocation);
	if (checkMate) {
		updateWinnerToFirebase(gameRef, player.toString());
		let userId = get(id);
		updateFirebaseStats(player, player, userId);
	}
};
