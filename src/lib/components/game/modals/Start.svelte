<script lang="ts">
	import { doc, getDoc, setDoc } from 'firebase/firestore';
	import { db } from '$lib/firebase/firebase';
	import { initPieces } from '../../../../functions/initPieces';
	import { gameId, winner, userId } from '../../../../stores';
	import { moves } from '../../../../stores/moves';
	import KingW from '../../../../pieces/King_W.svelte';
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
		let userRef = doc(db, 'users', $userId);
		let userDoc = await getDoc(userRef);
		let userData = userDoc.data();
		let blackPic = '';
		let blackName = '';
		if (userData) {
			blackPic = userData.picture;
			blackName = userData.userName;
		}
		try {
			await setDoc(doc(db, 'games', $gameId), {
				board: boardArray,
				player: turn,
				moves: $moves,
				black: $userId,
				blackPic: blackPic,
				blackName: blackName,
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
		<p>In order to start, copy the link and send it to your opponent.</p>
		<p>Once you are done, click start and wait for their first move.</p>
		<div class="choices">
			<input value={url} />
			<button class="copy" on:click={() => handleCopy()}>Copy</button>
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
		background-image: url('/greyBG.jpg');
		background-color: white;
		color: whitesmoke;
		padding: 2rem;
		padding-inline: 3rem;
		border: gray solid 0.5px;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
			rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	p {
		font-size: medium;
		margin: 0.5rem;
	}
	input {
		font-size: small;
		height: 2rem;
		width: 60%;
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		border-right: transparent solid 1px;
	}

	h2 {
		text-align: center;
	}
	.headerWrap {
		display: flex;
		gap: 1.5rem;
		align-items: center;
		justify-content: center;
	}
	.choices {
		display: flex;
		margin-top: 1rem;
		width: 100%;
		align-items: center;
		justify-content: center;
	}
	button {
		height: 2rem;
		padding-inline: 1rem;
	}
	.copy {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		margin-right: 0.75rem;
	}
</style>
