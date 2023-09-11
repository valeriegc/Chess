<script lang="ts">
	import { doc, setDoc } from 'firebase/firestore';
	import { db } from '$lib/firebase/firebase';
	import { initPieces } from '../functions/initPieces';
	import { gameId, winner, moves, userId } from '../stores';
	import KingW from '../pieces/King_W.svelte';
	import { page } from '$app/stores';

	let confirmation = false;
	export let visible;
	let url = $page.url.origin + '/game/' + $gameId;

	const initiateChat = async () => {
		try {
			await setDoc(doc(db, 'chats', $gameId), {
				chat: []
			});
		} catch {
			console.log('Something went wrong with chat');
		}
	};

	const createGame = async () => {
		let boardArray = initPieces();
		let turn = 'white';
		try {
			await setDoc(doc(db, 'games', $gameId), {
				board: boardArray,
				player: turn,
				moves: $moves,
				black: $userId,
				white: '',
				resignation: { resigned: false, resigner: '' },
				winner: $winner,
				checked: ''
			});
		} catch (e) {
			console.error('Error adding document: ', e);
		}
		visible = false;
		initiateChat();
	};

	const handleCopy = () => {
		{
			() => navigator.clipboard.writeText(url);
		}
		confirmation = true;
		setTimeout(() => (confirmation = false), 1000);
	};
</script>

<div class="modalContainer">
	<div class="modalWrap">
		<div class="headerWrap">
			<div><KingW /></div>
			<h2>CHESS</h2>
			<div><KingW /></div>
		</div>
		<p>
			In order to start the game, copy the link and send it to your opponent. Once you are done,
			click start and wait for your opponent.
		</p>
		<div class="choices">
			<input value={url} />
			<button on:click={() => handleCopy()}>Copy</button>
			<button on:click={() => createGame()}>Start</button>
		</div>
	</div>
</div>

<style>
	.modalContainer {
		position: absolute;
		display: flex;
		justify-content: center;
		height: 100%;
		width: 100%;
		background-color: var(--modalBg);
		transform: scale(1);
		z-index: 100;
	}
	.modalWrap {
		margin: auto;
		width: 38rem;
		background-color: white;
		padding: 2rem;
		padding-inline: 4rem;
		border: lightgray solid 0.5px;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
			rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
	}
	p {
		color: black;
		font-size: large;
	}
	input {
		border-color: black;
		color: black;
	}

	h2 {
		text-align: center;
		color: black;
	}
	.headerWrap {
		display: flex;
		gap: 1.5rem;
		align-items: center;
		justify-content: center;
	}
	.choices {
		margin-top: 1rem;
		margin-left: 2rem;
		display: flex;
		align-items: center;
	}
	button {
		height: 2.5rem;
		padding-inline: 1rem;
		margin-right: 0.5rem;
		border: solid black 1px;
	}
	input {
		height: 2.5rem;
	}
</style>
