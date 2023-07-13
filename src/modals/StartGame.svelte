<script>
	import Dialog from './Dialog.svelte';
	import { onMount } from 'svelte';
	let showModal = true;
	let url = '';

	onMount(() => (url = window.location.href));

	const queryParamGenerator = () => {
		url = window.location.href;
		let params = '';
		const charCodes = Array.from(Array(26)).map((e, i) => i + 65);
		const alphabet = charCodes.map((n) => String.fromCharCode(n));
		for (let i = 0; i < 10; i++) {
			let randomInt = Math.floor(Math.random() * (26 - 1 + 1) + 1);
			let randomLetter = alphabet[randomInt];
			if (randomInt % 2 == 0) randomLetter = randomLetter.toLowerCase();
			params = params + randomLetter;
		}
		url = url + params;
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
		<button>Copy</button>
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
	.choices {
		margin-top: 1rem;
		margin-left: 2rem;
		display: flex;
	}
	input {
		margin-left: 3em;
		margin-right: 1em;
		width: 16rem;
		border-radius: 10px;
		border: solid var(--darkSquare) 1px;
		color: var(--darkSquare);
		padding-inline: 1em;
	}
	button {
		border: transparent solid 1px;
		padding: 0.5em;
		border-radius: 10px;
		background-color: var(--darkSquare);
		color: white;
		cursor: pointer;
	}
	button:hover {
		background-color: var(--lightSquare);
		transition: 3ms;
		border: solid var(--darkSquare) 1px;
		color: var(--darkSquare);
	}
</style>
