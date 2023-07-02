import type { SvelteComponent } from 'svelte';
import TowerB from '../pieces/Tower_B.svelte';
import TowerW from '../pieces/Tower_W.svelte';
import HorseB from '../pieces/Horse_B.svelte';
import HorseW from '../pieces/Horse_W.svelte';
import PawnB from '../pieces/Pawn_B.svelte';
import PawnW from '../pieces/Pawn_W.svelte';
import QueenB from '../pieces/Queen_B.svelte';
import QueenW from '../pieces/Queen_W.svelte';
import BishopB from '../pieces/Bishop_B.svelte';
import BishopW from '../pieces/Bishop_W.svelte';
import KingB from '../pieces/King_B.svelte';
import KingW from '../pieces/King_W.svelte';

import { towerCheck } from './moveChecks/towerCheck';
import type { Square } from '../stores';
import { horseCheck } from './moveChecks/horseCheck';
import { pawnCheck } from './moveChecks/pawnCheck';
import { queenCheck } from './moveChecks/queenCheck';
import { bishopCheck } from './moveChecks/bishopCheck';
import { kingCheck } from './moveChecks/kingCheck';

export const pieceCheck = (
	movingPiece: typeof SvelteComponent,
	targetSquare: number,
	board: Square[],
	turn: string
) => {
	switch (movingPiece) {
		case TowerW:
		case TowerB:
			return towerCheck(targetSquare, board, turn);

		case HorseW:
		case HorseB:
			return horseCheck(targetSquare, board, turn);

		case PawnB:
		case PawnW:
			return pawnCheck(targetSquare, board, turn);

		case QueenB:
		case QueenW:
			return queenCheck(targetSquare, board, turn);

		case BishopB:
		case BishopW:
			return bishopCheck(targetSquare, board, turn);

		case KingB:
		case KingW:
			return kingCheck(targetSquare, board, turn);
	}
};
