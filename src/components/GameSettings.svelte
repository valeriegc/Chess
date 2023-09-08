<script lang="ts">
	let settings = true;
	let messages = [];
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
			<button>Resign</button>
			<button>Suggest a tie</button>
			<button>Ask for a takeback</button>
		</div>
	{:else}
		<div class="messageWrap" />
		<textarea name="msg" rows="3" />
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
		background-color: transparent;
	}
	.messageWrap {
		border: solid blue 1px;
		height: 70%;
	}
</style>
