<script>
	import { waiting, resign, player, winner } from '../stores';
	import AuthControl from './AuthControl.svelte';
</script>

<div class="spinnerBox">
	{#if $resign.resigned}
		{#if $resign.resigner == $player}
			You resigned the game.
		{:else}
			The opponent resigned the game.
		{/if}
	{:else if $winner}
		{#if $winner == $player}
			You won.
		{:else}
			The opponent won.
		{/if}
	{:else if $waiting}
		<div>Awaiting for opponent</div>
		<div class="spin" />
	{:else}
		<div>Your turn</div>
	{/if}
</div>

<style>
	.spinnerBox {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 2.5rem;
		font-style: italic;
		margin: 1rem;
	}
	.spin {
		height: 15px;
		width: 15px;
		border-radius: 15px;
		background-color: whitesmoke;
		animation: spin 1s infinite alternate;
	}
	@keyframes spin {
		from {
			transform: translate3d(30px, 0, 0);
		}
		to {
			transform: translate3d(-30px, 0, 0);
		}
	}
</style>
