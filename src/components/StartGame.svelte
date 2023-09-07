<script lang="ts">
	import { onMount } from 'svelte';
	import { doc, setDoc } from 'firebase/firestore';
	import { db } from '$lib/firebase/firebase';
	import { initPieces } from '../functions/initPieces';
	import { gameId, gameStarted, moves } from '../stores';
	import { goto } from '$app/navigation';
	import KingB from '../pieces/King_B.svelte';
	import KingW from '../pieces/King_W.svelte';
	let url: string;
	let confirmation = false;
	let initialParams = '';
	export let visible;

	onMount(() => (url = window.location.href));

	const createGame = async () => {
		$gameId = initialParams;
		let boardArray = initPieces();
		let turn = 'white';
		try {
			await setDoc(doc(db, 'games', $gameId), {
				board: boardArray,
				player: turn,
				moves: $moves
			});
		} catch (e) {
			console.error('Error adding document: ', e);
		}
		$gameStarted = true;
		$gameStarted = $gameStarted;
		visible = false;
		goto(url);
	};

	const queryParamGenerator = () => {
		initialParams = '';
		const charCodes = Array.from(Array(26)).map((e, i) => i + 65);
		const alphabet = charCodes.map((n) => String.fromCharCode(n));
		for (let i = 0; i < 10; i++) {
			let randomInt = Math.floor(Math.random() * (25 - 1 + 1) + 1);
			let randomLetter = alphabet[randomInt];
			initialParams = initialParams + randomLetter;
		}
		initialParams = initialParams.toLowerCase();
		url += '/' + initialParams;
		return url;
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
			<div><KingB /></div>
			<h2>CHESS</h2>
			<div><KingW /></div>
		</div>
		<p>
			In order to start the game, use the button below to generate a link. Copy the link and send it
			to your opponent. Once you are done, click start and wait for your opponent.
		</p>
		<div class="choices">
			<button on:click={() => queryParamGenerator()}>Generate link </button>
			<input value={url} />
			<button class="copyBtn" on:click={() => handleCopy()}>Copy</button>
			<button class="startBtn" on:click={() => createGame()}>Start</button>
		</div>
	</div>
</div>

<style>
	* {
		margin: 0;
	}
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
		width: 38em;
		padding: 2.5rem;
		background-color: whitesmoke;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
			rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
		margin: auto;
	}

	h2 {
		text-align: center;
	}
	.headerWrap {
		display: flex;
		gap: 1.5rem;
		align-items: center;
		justify-content: center;
		margin: 1rem;
	}
	p {
		margin: 2rem;
	}

	.startBtn {
		background-color: var(--secondary);
		color: var(--primary);
		border: 1px solid var(--primary);
		margin-left: 1rem;
	}
	.choices {
		margin-top: 1rem;
		margin-left: 2rem;
	}
	input {
		margin-left: 1rem;
		margin-right: 0;
		padding: 0.2rem;
		width: 16rem;
		border: solid var(--tertiary) 1px;
		padding-inline: 1rem;
	}
	button {
		padding: 0.2rem;
		padding-inline: 0.5rem;
		background-color: var(--primary);
		border: 1px solid transparent;
		color: var(--secondary);
		cursor: pointer;
		border-radius: 0;
	}
	button:hover {
		transition: 3000;
		color: var(--primary);
		border: 1px solid var(--primary);
		background-color: var(--secondary);
	}
</style>
