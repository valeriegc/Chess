import type { PieceType, Square } from '$lib/interfaces/interfaces';

export const initPieces = () => {
	const boardArray: Square[] = [];
	const blackPieces: PieceType[] = [
		'rook',
		'horse',
		'bishop',
		'queen',
		'king',
		'bishop',
		'horse',
		'rook'
	];
	let whitePieces = [...blackPieces];

	for (let i = 0; i < 8; i++) {
		blackPieces.push('pawn');
		whitePieces.unshift('pawn');
	}

	for (let i = 0; i < 64; i++) {
		if (i < 16) {
			boardArray.push({
				coords: '',
				piece: { type: blackPieces[i], color: 'black' }
			});
		} else if (i > 47) {
			boardArray.push({
				coords: '',
				piece: { type: whitePieces[i - 48], color: 'white' }
			});
		} else {
			boardArray.push({
				coords: '',
				piece: null
			});
		}
	}
	return boardArray;
};
