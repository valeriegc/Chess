export const createGameId = () => {
	let alphabetLength = 26;
	let lowercaseA = 'a'.charCodeAt(0);
	let gameId = '';
	const charCodes = Array.from(Array(alphabetLength)).map((_, i) => lowercaseA + i);
	const alphabet = charCodes.map((n) => String.fromCharCode(n));
	for (let i = 0; i < 10; i++) {
		let randomLoc = Math.floor(Math.random() * alphabetLength);
		let randomLetter = alphabet[randomLoc];
		gameId = gameId + randomLetter;
	}
	return gameId;
};
