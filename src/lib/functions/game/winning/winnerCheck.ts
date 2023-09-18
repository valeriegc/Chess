import { updateWinnerToFirebase } from '$lib/firebase/firebaseUpdate';
import type { Square } from '$lib/interfaces/interfaces';
import { isCheckMate } from '../check/isCheckMate';
import { findKing } from '../moving/squareContent';

export const checkForWinner = async (boardArr: Square[], turn, player, gameRef) => {
	let kingLocation = findKing(boardArr, turn);
	const checkMate = isCheckMate(boardArr, turn, kingLocation);
	if (checkMate) {
		updateWinnerToFirebase(gameRef, player);
	}
};
