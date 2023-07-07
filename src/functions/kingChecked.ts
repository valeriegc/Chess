import type { SvelteComponent } from 'svelte';
import type { Square } from '../stores';
import { horseCheck } from './moveChecks/horseCheck';
import HorseW from '../pieces/Horse_W.svelte';
import { pawnCheck } from './moveChecks/pawnCheck';
import PawnW from '../pieces/Pawn_W.svelte';
import QueenW from '../pieces/Queen_W.svelte';
import QueenB from '../pieces/Queen_B.svelte';
import { towerCheck } from './moveChecks/towerCheck';
import TowerW from '../pieces/Tower_W.svelte';
import { bishopCheck } from './moveChecks/bishopCheck';
import BishopW from '../pieces/Bishop_W.svelte';
import PawnB from '../pieces/Pawn_B.svelte';
import { kingCheck } from './moveChecks/kingCheck';
import BishopB from '../pieces/Bishop_B.svelte';
import TowerB from '../pieces/Tower_B.svelte';
import HorseB from '../pieces/Horse_B.svelte';
import KingB from '../pieces/King_B.svelte';

export const kingChecked = (board: Square[], king: typeof SvelteComponent, index: number) => {
	const colorToCheck = king == KingB ? 'white' : 'black';
	const bishopCheckDefiner = king == KingB ? 'black' : 'white';

	let pawnToCheckInCheck: typeof SvelteComponent;
	let pawnToFilter: typeof SvelteComponent;
	let bishopToFilter: typeof SvelteComponent;
	let towerToFilter: typeof SvelteComponent;
	let horseToFilter: typeof SvelteComponent;
	let queenToFilter: typeof SvelteComponent;

	if (colorToCheck == 'white') {
		pawnToCheckInCheck = PawnB;
		pawnToFilter = PawnW;
		bishopToFilter = BishopW;
		towerToFilter = TowerW;
		horseToFilter = HorseW;
		queenToFilter = QueenW;
	} else {
		pawnToCheckInCheck = PawnW;
		pawnToFilter = PawnB;
		bishopToFilter = BishopB;
		towerToFilter = TowerB;
		horseToFilter = HorseB;
		queenToFilter = QueenB;
	}
	let isChecked = false;
	let pawnThreat: number[];
	let pawnThreat2: number[];
	console.log(index);
	if (king == KingB) {
		pawnThreat = pawnCheck(index, board, colorToCheck, pawnToCheckInCheck);
		pawnThreat2 = pawnThreat.filter((n) => n > index && n < 63 && n > 0 && n !== index + 8);
		pawnThreat2.forEach((n) => {
			if (board[n].occupier.component == PawnW) isChecked = true;
		});
	} else {
		pawnThreat = pawnCheck(index, board, colorToCheck, pawnToCheckInCheck);
		pawnThreat2 = pawnThreat.filter((n) => n < index && n < 63 && n > 0 && n !== index - 8);
		pawnThreat2.forEach((n) => {
			if (board[n].occupier.component == PawnB) isChecked = true;
		});
	}

	const bishopThreat = bishopCheck(index, board, bishopCheckDefiner);
	bishopThreat.forEach((n) => {
		if (
			board[n].occupier.component == bishopToFilter ||
			board[n].occupier.component == queenToFilter
		)
			isChecked = true;
	});
	const towerThreat = towerCheck(index, board, colorToCheck);
	towerThreat.forEach((n) => {
		if (
			board[n].occupier.component == towerToFilter ||
			board[n].occupier.component == queenToFilter
		)
			isChecked = true;
	});
	const horseThreat = horseCheck(index, board, colorToCheck);
	horseThreat.forEach((n) => {
		if (board[n].occupier.component == horseToFilter) isChecked = true;
	});
	if (isChecked) return true;
	else return false;
};
export const kingCheckMate = (king: typeof SvelteComponent, index: number, board: Square[]) => {
	let remainingKingMoves = [];
	let turn = '';
	if (king == KingB) {
		turn = 'black';
		remainingKingMoves = kingCheck(index, board, turn);
		const allowedKingMoves = remainingKingMoves.filter((n) => !kingChecked(board, king, n));
		if (allowedKingMoves.length == 0) return true;
	} else {
		turn = 'white';
		remainingKingMoves = kingCheck(index, board, turn);
		const allowedKingMoves = remainingKingMoves.filter((n) => !kingChecked(board, king, n));

		if (allowedKingMoves.length == 0) return true;
	}
	return false;
};
