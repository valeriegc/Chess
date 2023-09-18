export interface FillSquare {
	piece: Piece;
	square: number;
}
export const pieceList = ['pawn', 'rook', 'horse', 'bishop', 'queen', 'king'] as const;

export type PieceType = (typeof pieceList)[number];
export interface Piece {
	type: PieceType;
	color: 'black' | 'white';
}
export interface Square {
	coords: string;
	piece: Piece | null;
}

export interface User {
	email: string;
	picture: string;
	lost: number;
	won: number;
	played: number;
	uid: string;
}

export interface Resign {
	resigned: boolean;
	resigner: string;
}
