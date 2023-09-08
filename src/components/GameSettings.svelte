<script lang="ts">
	import { db } from '$lib/firebase/firebase';
	import { player } from '../stores';
	import { arrayUnion, doc, updateDoc, onSnapshot } from 'firebase/firestore';
	import { gameId } from '../stores';

	interface Msg {
		message: string;
		sender: string;
	}

	let settings = false;
	let msg = '';
	let messages: Msg[] = [];

	const chatRef = doc(db, 'chats', $gameId);

	const sendMsg = async (e) => {
		if (e.which == 13) {
			messages.push({
				message: msg,
				sender: $player
			});
			await updateDoc(chatRef, {
				chat: arrayUnion({
					message: msg,
					sender: $player
				})
			});
			msg = '';
			return messages;
		}
	};
	onSnapshot(doc(db, 'chats', $gameId), (doc) => {
		const allData = doc.data();
		if (allData) {
			messages = allData.chat;
		}
	});
</script>

<div class="container">
	<div>
		<button
			style="border-bottom:{settings ? '2px solid white' : 'none'}"
			on:click={() => (settings = true)}><img class="icon" src="/settings.png" /></button
		>
		<button
			style="border-bottom:{!settings ? '2px solid white' : 'none'}"
			on:click={() => (settings = false)}><img class="icon" src="/chat.png" /></button
		>
	</div>
	{#if settings}
		<div class="buttonWrap">
			<button>Resign <img src="/resign.png" class="iconS" /></button>
			<button>Suggest a tie <img src="/tie.png" class="iconS" /></button>
			<button>Ask for a takeback <img src="/return.png" class="iconS" /></button>
		</div>
	{:else}
		<div class="messageWrap">
			<div>
				{#each messages as { message, sender }}
					<div class="content">
						<p class={sender == $player ? 'ownMsg' : 'opponentMsg'}>{message}</p>
					</div>
				{/each}
			</div>
		</div>
		<textarea
			placeholder="Send a message to your opponent"
			bind:value={msg}
			name="msg"
			rows="3"
			on:keypress={sendMsg}
		/>
	{/if}
</div>

<style>
	.container {
		height: 400px;
		width: 300px;
	}
	.icon {
		height: 2rem;
		width: auto;
	}
	.iconS {
		height: 1.5rem;
		width: auto;
	}
	.buttonWrap {
		display: flex;
		flex-direction: column;
		width: 80%;
	}
	button {
		text-align: left;
		margin-bottom: 1rem;
	}

	textarea {
		width: 100%;
		height: 3rem;
		background-color: rgba(0, 0, 0, 0.411);
		margin-top: 0.25rem;
		border: solid black 1px;
		padding: 5px;
		outline: none;
	}
	.messageWrap {
		border: solid black 1px;
		height: 70%;
		background-color: rgba(0, 0, 0, 0.411);
	}
	.content {
		font-size: small;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
		margin: 0.75rem;
	}
	p {
		margin: 0;
	}
	.ownMsg {
		color: grey;
		text-align: left;
		width: 100%;
		margin: 0;
	}
	.opponentMsg {
		color: whitesmoke;
		text-align: right;
		width: 100%;
		margin: 0;
	}
	textarea::placeholder {
		color: lightgrey;
		font-style: italic;
	}
</style>
