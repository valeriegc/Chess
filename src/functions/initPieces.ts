import type { Square } from '../stores';
import TowerB from '../pieces/Tower_B.svelte';
import HorseB from '../pieces/Horse_B.svelte';
import BishopB from '../pieces/Bishop_B.svelte';
import QueenB from '../pieces/Queen_B.svelte';
import KingB from '../pieces/King_B.svelte';
import PawnB from '../pieces/Pawn_B.svelte';
import TowerW from '../pieces/Tower_W.svelte';
import HorseW from '../pieces/Horse_W.svelte';
import BishopW from '../pieces/Bishop_W.svelte';
import QueenW from '../pieces/Queen_W.svelte';
import KingW from '../pieces/King_W.svelte';
import PawnW from '../pieces/Pawn_W.svelte';

export const initPieces = () => {
	const boardArray: Square[] = [];
	const piecesBlack = [TowerB, HorseB, BishopB, QueenB, KingB, BishopB, HorseB, TowerB];

	for (let i = 0; i < 8; i++) {
		piecesBlack.push(PawnB);
	}

	const piecesWhite = [TowerW, HorseW, BishopW, QueenW, KingW, BishopW, HorseW, TowerW];
	for (let i = 0; i < 8; i++) {
		piecesWhite.unshift(PawnW);
	}

	for (let i = 0; i < 64; i++) {
		if (i < 16) {
			boardArray.push({
				coords: '',
				occupier: { component: piecesBlack[i], color: 'black' }
			});
		} else if (i > 47) {
			boardArray.push({
				coords: '',
				occupier: { component: piecesWhite[i - 48], color: 'white' }
			});
		} else {
			boardArray.push({
				coords: '',
				occupier: { component: null, color: '' }
			});
		}
	}
	return boardArray;
};
