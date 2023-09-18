import BishopB from '../../lib/components/game/pieces/Bishop_B.svelte';
import BishopW from '../../lib/components/game/pieces/Bishop_W.svelte';
import HorseB from '../../lib/components/game/pieces/Horse_B.svelte';
import HorseW from '../../lib/components/game/pieces/Horse_W.svelte';
import KingB from '../../lib/components/game/pieces/King_B.svelte';
import KingW from '../../lib/components/game/pieces/King_W.svelte';
import PawnB from '../../lib/components/game/pieces/Pawn_B.svelte';
import PawnW from '../../lib/components/game/pieces/Pawn_W.svelte';
import QueenB from '../../lib/components/game/pieces/Queen_B.svelte';
import QueenW from '../../lib/components/game/pieces/Queen_W.svelte';
import TowerB from '../../lib/components/game/pieces/Tower_B.svelte';
import TowerW from '../../lib/components/game/pieces/Tower_W.svelte';
import type { Piece } from '../../stores/stores';

export const getPiececomponent = (piece: Piece) => {
	let pieceTree = {
		white: {
			pawn: PawnW,
			tower: TowerW,
			horse: HorseW,
			bishop: BishopW,
			queen: QueenW,
			king: KingW
		},
		black: {
			pawn: PawnB,
			tower: TowerB,
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
