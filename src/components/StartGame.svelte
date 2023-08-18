<script lang="ts">
	import { onMount } from 'svelte';
	import Dialog from '../modals/Dialog.svelte';
	import { getFirestore, doc, setDoc } from 'firebase/firestore';
	import { app } from '$lib/firebase/firebase';
	import { initPieces } from '../functions/initPieces';
	import { gameStarted } from '../stores';
	import { goto } from '$app/navigation';
	export const db = getFirestore(app);
	let showModal: boolean = true;
	let url: string;
	let confirmation = false;
	let initialParams = '';
	let gameParams = '';

	onMount(() => (url = window.location.href));

	const createGame = async () => {
		let boardArray = initPieces();
		let turn = 'white';
		try {
			const docRef = await setDoc(doc(db, 'games', gameParams), {
				board: boardArray,
				player: turn
			});
		} catch (e) {
			console.error('Error adding document: ', e);
		}
		showModal = false;
		$gameStarted = true;
		$gameStarted = $gameStarted;
		goto(url);
	};

	const queryParamGenerator = () => {
		url = window.location.href;
		const charCodes = Array.from(Array(26)).map((e, i) => i + 65);
		const alphabet = charCodes.map((n) => String.fromCharCode(n));
		for (let i = 0; i < 10; i++) {
			let randomInt = Math.floor(Math.random() * (26 - 1 + 1) + 1);
			let randomLetter = alphabet[randomInt];
			if (randomInt % 2 == 0) randomLetter = randomLetter.toLowerCase();
			initialParams = initialParams + randomLetter;
		}
		//2 values for params, so that url never renders empty params but can be changed
		gameParams = initialParams;
		url = url + '/' + gameParams;
		initialParams = '';
	};

	const handleCopy = () => {
		{
			() => navigator.clipboard.writeText(url);
		}
		confirmation = true;
		setTimeout(() => (confirmation = false), 1000);
	};
</script>

<Dialog bind:showModal>
	<h2 slot="header">CHESS</h2>
	<p slot="text">
		In order to start the game, use the button below to generate a link. Copy the link and send it
		to your opponent. Once you are done, you can close this window and wait for your opponent.
	</p>
	<div class="choices" slot="choices">
		<button on:click={() => queryParamGenerator()}>Generate link </button>
		<input value={url} />
		<button on:click={() => handleCopy()}>Copy</button>
		{#if confirmation}
			<div class="copied">Copied!</div>
		{/if}
		<button on:click={() => createGame()}>Start</button>
	</div></Dialog
>

<style>
	* {
		color: black;
	}
	h2 {
		text-align: center;
	}
	p {
		margin-inline: 2rem;
	}
	.copied {
		font-size: medium;
		margin-left: 1rem;
		margin-top: 0.5rem;
	}
	.choices {
		margin-top: 1rem;
		margin-left: 2rem;
		display: flex;
	}
	input {
		margin-left: 3rem;
		margin-right: 1rem;
		width: 16rem;
		border: solid darkgray 1px;
		padding-inline: 1rem;
	}
	button {
		padding: 0.5rem;
		background-color: black;
		border: 1px solid transparent;
		color: white;
		cursor: pointer;
	}
	button:hover {
		transition: 3000;
		color: black;
		border: 1px solid black;
		background-color: white;
	}
</style>
