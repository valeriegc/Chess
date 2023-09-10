<script lang="ts">
	import { db } from '$lib/firebase/firebase';
	import { player } from '../stores';
	import { arrayUnion, doc, updateDoc, onSnapshot } from 'firebase/firestore';
	import { gameId } from '../stores';

	interface Msg {
		message: string;
		sender: string;
	}

	export const controlMenu = (selectedBtn: string) => {
		switch (selectedBtn) {
			case 'chat':
				chat = true;
				giveup = false;
				tie = false;
				takeback = false;
				break;
			case 'giveup':
				chat = false;
				giveup = true;
				tie = false;
				takeback = false;
				break;
			case 'tie':
				chat = false;
				giveup = false;
				tie = true;
				takeback = false;
				break;
			case 'takeback':
				chat = false;
				giveup = false;
				tie = false;
				takeback = true;
				break;
		}
	};

	let chat = true;
	let giveup = false;
	let tie = false;
	let takeback = false;
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
			style="border-bottom:{chat ? '2px solid white' : 'none'}"
			on:click={() => controlMenu('chat')}><img class="icon" src="/chat.png" /></button
		>
		<button
			style="border-bottom:{giveup ? '2px solid white' : 'none'}"
			on:click={() => controlMenu('giveup')}><img src="/resign.png" class="icon" /></button
		>
		<button
			style="border-bottom:{tie ? '2px solid white' : 'none'}"
			on:click={() => controlMenu('tie')}><img src="/tie.png" class="icon" /></button
		>
		<button
			style="border-bottom:{takeback ? '2px solid white' : 'none'}"
			on:click={() => controlMenu('takeback')}><img src="/return.png" class="icon" /></button
		>
	</div>

	{#if chat}
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
	{:else if giveup}
		<div class="messageWrap">
			<div class="innerWrap">
				<p>Resign the game?</p>
				<div>
					<button class="yesButton">Yes</button><button on:click={() => controlMenu('chat')}
						>No</button
					>
				</div>
			</div>
		</div>
	{:else if tie}
		<div class="messageWrap">
			<div class="innerWrap">
				<p>Suggest a tie?</p>
				<div>
					<button class="yesButton">Yes</button><button on:click={() => controlMenu('chat')}
						>No</button
					>
				</div>
			</div>
		</div>
	{:else if takeback}
		<div class="messageWrap">
			<div class="innerWrap">
				<p>Ask opponent for takeback?</p>
				<div>
					<button class="yesButton">Yes</button><button on:click={() => controlMenu('chat')}
						>No</button
					>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.container {
		height: 400px;
		width: 300px;
		margin-right: 5rem;
	}
	.icon {
		height: 2rem;
		width: auto;
	}

	button {
		text-align: left;
		margin-bottom: 1rem;
		border: solid transparent 2px;
	}
	button:hover {
		background-color: black;
		border: solid transparent 2px;
		border-bottom: white 2px solid;
	}
	.yesButton {
		margin-right: 1rem;
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
		display: flex;
		flex-direction: column;
	}
	.innerWrap {
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
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
