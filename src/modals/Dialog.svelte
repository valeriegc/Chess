<script lang="ts">
	export let showModal: boolean;
	let dialog: HTMLDialogElement;
	$: if (dialog && showModal) dialog.showModal();
</script>

<dialog bind:this={dialog} on:close={() => (showModal = false)}>
	<div>
		<slot name="header" />
		<hr />
		<slot name="text" />
		<hr />
		<slot name="choices" />
		<button class="close" on:click={() => dialog.close()}>x</button>
	</div>
</dialog>

<style>
	hr {
		background-color: var(--darkSquare);
		height: 0.5px;
		border: none;
	}
	dialog {
		width: 38em;
		border-radius: 30px;
		background-color: var(--lightSquare);
		border: solid 2px var(--darkSquare);
		position: relative;
	}

	dialog::backdrop {
		background-color: RGBA(255, 255, 255, 0.5);
		backdrop-filter: blur(2px);
	}
	.close {
		position: absolute;
		right: 1rem;
		top: 1rem;
		color: white;
		font-size: x-large;
		border: 2px solid var(--darkSquare);
		border-radius: 100%;
		width: 2rem;
		height: 2rem;
		padding: 0;
		font-weight: bold;
		background-color: var(--darkSquare);
		cursor: pointer;
	}
</style>
