import { get } from 'svelte/store';
import { moves, type Square } from '../../stores';
import { kingChecked } from '../kingChecked';

export const castlingCheck = (board: Square[], turn: 'black' | 'white') => {
	let leftRoute = [];
	let rightRoute = [];
	let castleRight: number;
	let castleLeft: number;
	let castleSquares: number[];
	let leftTowerNotMoved;
	let rightTowerNotMoved;
	castleSquares = [];
	const pastMoves = get(moves);

	if (turn == 'black') {
		leftRoute = [1, 2, 3];
		rightRoute = [5, 6];
		castleRight = 7;
		castleLeft = 0;
		leftTowerNotMoved = !pastMoves.find((n) => n.piece.type == 'tower' && n.pre == 0);
		rightTowerNotMoved = !pastMoves.find((n) => n.piece.type == 'tower' && n.pre == 7);
	} else {
		leftRoute = [57, 58, 59];
		rightRoute = [61, 62];
		castleRight = 63;
		castleLeft = 56;
		leftTowerNotMoved = !pastMoves.find((n) => n.piece.type == 'tower' && n.pre == 56);
		rightTowerNotMoved = !pastMoves.find((n) => n.piece.type == 'tower' && n.pre == 63);
	}
	const kingAlreadyMoved = pastMoves.find((n) => n.piece.type == 'king' && n.piece.color == turn);

	if (kingAlreadyMoved) return;

	const isRouteEmpty = (route: number[]) => {
		let empty = true;
		route.forEach((n) => {
			if (board[n].piece) {
				empty = false;
			}
		});
		return empty;
	};

	const kingCheckedOnRoute = (route: number[]) => {
		let checked = false;
		route.forEach((n) => {
			if (kingChecked(board, { type: 'king', color: turn }, n)) checked = true;
		});
		return checked;
	};
	const canCastleLeft =
		leftTowerNotMoved && isRouteEmpty(leftRoute) && !kingCheckedOnRoute(leftRoute);

	if (canCastleLeft) {
		castleSquares.push(castleLeft);
	}
	const canCastleRight =
		rightTowerNotMoved && isRouteEmpty(rightRoute) && !kingCheckedOnRoute(rightRoute);

	if (canCastleRight) {
		castleSquares.push(castleRight);
	}

	return castleSquares;
};
