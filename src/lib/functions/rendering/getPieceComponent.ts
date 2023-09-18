import type { Piece } from '$lib/interfaces/interfaces';
import BishopB from '../../../pieces/Bishop_B.svelte';
import BishopW from '../../../pieces/Bishop_W.svelte';
import HorseB from '../../../pieces/Horse_B.svelte';
import HorseW from '../../../pieces/Horse_W.svelte';
import KingB from '../../../pieces/King_B.svelte';
import KingW from '../../../pieces/King_W.svelte';
import PawnB from '../../../pieces/Pawn_B.svelte';
import PawnW from '../../../pieces/Pawn_W.svelte';
import QueenB from '../../../pieces/Queen_B.svelte';
import QueenW from '../../../pieces/Queen_W.svelte';
import RookB from '../../../pieces/Rook_B.svelte';
import RookW from '../../../pieces/Rook_W.svelte';

export const getPiececomponent = (piece: Piece) => {
	let pieceTree = {
		white: {
			pawn: PawnW,
			rook: RookW,
			horse: HorseW,
			bishop: BishopW,
			queen: QueenW,
			king: KingW
		},
		black: {
			pawn: PawnB,
			rook: RookB,
			horse: HorseB,
			bishop: BishopB,
			queen: QueenB,
			king: KingB
		}
	};
	let color = piece.color;
	let type = piece.type;

	return pieceTree[color][type];
};
