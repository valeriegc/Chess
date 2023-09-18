export const changeTurn = (turn: 'white' | 'black') => {
	turn == 'white' ? (turn = 'black') : (turn = 'white');
	return turn;
};
