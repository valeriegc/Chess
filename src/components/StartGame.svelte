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
	let params = '';

	onMount(() => (url = window.location.href));

	const createGame = async () => {
		let boardArray = initPieces();
		let turn = 'white';
		try {
			const docRef = await setDoc(doc(db, 'games', params), {
				board: boardArray,
				player: turn
			});
		} catch (e) {
			console.error('Error adding document: ', e);
		}
		showModal = false;
		$gameStarted = true;
		$gameStarted = $gameStarted;
		let link = '/game/' + params;
		goto(link);
	};

	const queryParamGenerator = () => {
		url = window.location.href;
		const charCodes = Array.from(Array(26)).map((e, i) => i + 65);
		const alphabet = charCodes.map((n) => String.fromCharCode(n));
		for (let i = 0; i < 10; i++) {
			let randomInt = Math.floor(Math.random() * (26 - 1 + 1) + 1);
			let randomLetter = alphabet[randomInt];
			if (randomInt % 2 == 0) randomLetter = randomLetter.toLowerCase();
			params = params + randomLetter;
		}
		url = url + '/' + params;
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
	h2 {
		text-align: center;
		color: var(--darkSquare);
	}
	p {
		color: var(--darkSquare);
		margin-inline: 2rem;
	}
	.copied {
		font-size: medium;
		color: var(--darkSquare);
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
		border-radius: 10px;
		border: solid var(--darkSquare) 1px;
		color: var(--darkSquare);
		padding-inline: 1rem;
	}
	button {
		border: transparent solid 1px;
		padding: 0.5rem;
		border-radius: 10px;
		background-color: var(--darkSquare);
		color: white;
		cursor: pointer;
	}
	button:hover {
		background-color: var(--lightSquare);
		transition: 3000;
		border: solid var(--darkSquare) 1px;
		color: var(--darkSquare);
	}
</style>
