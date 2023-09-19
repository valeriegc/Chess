import { updateFirebaseStats, updateWinnerToFirebase } from '$lib/firebase/firebaseUpdate';
import type { Square } from '$lib/interfaces/interfaces';
import { userId as id } from '$lib/stores/stores';
import { get } from 'svelte/store';
import { isCheckMate } from './isCheckMate';
import { findKing } from '../moving/squareContent';
import type { DocumentReference } from 'firebase/firestore';

export const checkForWinner = async (
	boardArr: Square[],
	turn: 'black' | 'white',
	player: 'black' | 'white',
	gameRef: DocumentReference
) => {
	let kingLocation = findKing(boardArr, turn);
	const checkMate = isCheckMate(boardArr, turn, kingLocation);
	if (checkMate) {
		updateWinnerToFirebase(gameRef, player);
		let userId = get(id);
		updateFirebaseStats(player, player, userId);
	}
};
