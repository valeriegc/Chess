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
import { row } from '../global';

export const kingChecked = (
	board: Square[],
	king: typeof SvelteComponent,
	kingLocation: number
) => {
	const opponent = king == KingB ? 'white' : 'black';
	let ownColor: string;
	let ownPawn: typeof SvelteComponent;
	let opponentPawn: typeof SvelteComponent;
	let opponentBishop: typeof SvelteComponent;
	let opponentTower: typeof SvelteComponent;
	let opponentHorse: typeof SvelteComponent;
	let opponentQueen: typeof SvelteComponent;

	if (opponent == 'white') {
		ownColor = 'black';
		ownPawn = PawnB;
		opponentPawn = PawnW;
		opponentBishop = BishopW;
		opponentTower = TowerW;
		opponentHorse = HorseW;
		opponentQueen = QueenW;
	} else {
		ownPawn = PawnW;
		ownColor = 'white';
		opponentPawn = PawnB;
		opponentBishop = BishopB;
		opponentTower = TowerB;
		opponentHorse = HorseB;
		opponentQueen = QueenB;
	}
	let isKingChecked = false;

	const checkForOpponent = (threatArr: number[], piece: typeof SvelteComponent) => {
		threatArr.forEach((n) => {
			if (board[n].occupier.component == piece) isKingChecked = true;
		});
	};

	const pawnThreat = pawnCheck(kingLocation, board, opponent, ownPawn);
	const pawnThreatFinal = pawnThreat.filter(
		(n) => n !== kingLocation + row && n !== kingLocation - row
	);
	checkForOpponent(pawnThreatFinal, opponentPawn);

	const bishopThreat = bishopCheck(kingLocation, board, ownColor);
	checkForOpponent(bishopThreat, opponentBishop);

	const towerThreat = towerCheck(kingLocation, board, opponent);
	checkForOpponent(towerThreat, opponentTower);

	const horseThreat = horseCheck(kingLocation, board, opponent);
	checkForOpponent(horseThreat, opponentHorse);

	const queenThreat = bishopThreat.concat(towerThreat);
	checkForOpponent(queenThreat, opponentQueen);

	return isKingChecked;
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
