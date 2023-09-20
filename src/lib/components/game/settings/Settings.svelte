<script lang="ts">
	import { db } from '$lib/firebase/firebase';
	import { player } from '../../../stores/stores';
	import { arrayUnion, doc, updateDoc, onSnapshot } from 'firebase/firestore';
	import { gameId } from '../../../stores/stores';

	let hoveringChat = false;
	let hoveringGiveup = false;
	let hoveringTie = false;

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
				break;
			case 'giveup':
				chat = false;
				giveup = true;
				tie = false;
				break;
			case 'tie':
				chat = false;
				giveup = false;
				tie = true;
				break;
		}
	};

	let chat = true;
	let giveup = false;
	let tie = false;
	let msg = '';
	let messages: Msg[] = [];

	const chatRef = doc(db, 'chats', $gameId);
	const gameRef = doc(db, 'games', $gameId);

	const sendMsg = async (e: KeyboardEvent) => {
		if (e.key == 'Enter') {
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
	const resignGame = async () => {
		updateDoc(gameRef, {
			resignation: {
				resigned: true,
				resigner: $player
			}
		});
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
			style="border-bottom:{chat || hoveringChat ? '2px solid whitesmoke' : 'none'}"
			on:mouseover={() => (hoveringChat = true)}
			on:mouseleave={() => (hoveringChat = false)}
			on:click={() => controlMenu('chat')}
			class="menuBtn"><img class="icon" src="/chat.png" /></button
		>
		<button
			style="border-bottom:{giveup || hoveringGiveup ? '2px solid whitesmoke' : 'none'}"
			on:mouseover={() => (hoveringGiveup = true)}
			on:mouseleave={() => (hoveringGiveup = false)}
			on:click={() => controlMenu('giveup')}
			class="menuBtn"><img src="/resign.png" class="icon" /></button
		>
		<button
			style={tie || hoveringTie ? 'border-bottom:solid whitesmoke 2px' : ''}
			on:mouseover={() => (hoveringTie = true)}
			on:mouseleave={() => (hoveringTie = false)}
			on:click={() => controlMenu('tie')}
			class="menuBtn"><img src="/tie.png" class="icon" /></button
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
					<button on:click={resignGame} class="noAndYes" id="yes">Yes</button><button
						class="noAndYes"
						on:click={() => controlMenu('chat')}>No</button
					>
				</div>
			</div>
		</div>
	{:else if tie}
		<div class="messageWrap">
			<div class="innerWrap">
				<p>Suggest a tie?</p>
				<div>
					<button class="noAndYes" id="yes">Yes</button><button
						class="noAndYes"
						on:click={() => controlMenu('chat')}>No</button
					>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.container {
		height: 400px;
		width: 350px;
		margin-right: 5rem;
		margin-left: 2rem;
	}
	.icon {
		height: 2rem;
		width: auto;
	}

	.menuBtn {
		text-align: left;
		margin-bottom: 1rem;
		border: solid transparent 2px;
	}
	.menuBtn:hover {
		background-color: black;
		border: solid transparent 2px;
		border-bottom: white 2px solid;
		transition: 0;
	}
	#yes {
		margin-right: 1rem;
	}
	.noAndYes {
		font-size: small;
		padding-inline: 1rem;
		padding-block: 0.5rem;
	}

	textarea {
		width: 100%;
		height: 3rem;
		background-color: rgba(0, 0, 0, 0.411);
		margin-top: 0.25rem;
		border: solid black 1px;
		padding: 5px;
		outline: none;
		border-radius: 5px;
	}
	.messageWrap {
		border: solid black 1px;
		border-radius: 5px;
		height: 70%;
		background-color: rgba(0, 0, 0, 0.411);
		display: flex;
		flex-direction: column;
		padding: 0.5rem;
		overflow-y: scroll;
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
		color: rgb(185, 185, 185);
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
	::-webkit-scrollbar {
		width: 8px;
	}

	/*track*/
	::-webkit-scrollbar-track {
		background: transparent;
		-webkit-border-radius: 10px;
		border-radius: 10px;
	}

	/*handle */
	::-webkit-scrollbar-thumb {
		background: rgba(245, 245, 245, 0.434);
		-webkit-border-radius: 10px;
		border-radius: 10px;
	}

	/*handle-hover*/
	::-webkit-scrollbar-thumb:hover {
		background: rgba(169, 169, 169, 0.524);
	}
</style>
