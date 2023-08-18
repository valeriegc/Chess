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
		background-color: black;
		height: 0.5px;
		border: none;
	}
	dialog {
		width: 38em;
		padding: 2.5rem;
		background-color: whitesmoke;
		position: relative;
		border: none;
		box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
	}

	dialog::backdrop {
		background-color: RGBA(0, 0, 0, 0.7);
		backdrop-filter: blur(2px);
	}
	.close {
		position: absolute;
		right: 1rem;
		top: 1rem;
		color: white;
		font-size: x-large;
		width: 2rem;
		height: 2rem;
		background-color: black;
		cursor: pointer;
		border: none;
		text-align: center;
	}
</style>
