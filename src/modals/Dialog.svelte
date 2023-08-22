<script lang="ts">
	export let showModal: boolean;
	let dialog: HTMLDialogElement;
	$: if (dialog && showModal) dialog.showModal();
</script>

<dialog bind:this={dialog} on:close={() => (showModal = false)}>
	<div class="headerline">
		<slot name="logoOne" />
		<slot name="header" />
		<slot name="logoTwo" />
	</div>
	<slot name="text" />
	<slot name="choices" />
</dialog>

<style>
	.headerline {
		display: flex;
		gap: 1.5rem;
		align-items: center;
		margin: auto;
	}
	dialog {
		width: 38em;
		padding: 2.5rem;
		background-color: whitesmoke;
		position: relative;
		border: none;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
			rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	dialog::backdrop {
		background-color: RGBA(0, 0, 0, 0.7);
		backdrop-filter: blur(2px);
	}
</style>
