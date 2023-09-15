<script>
	import { player, resign } from '../stores';
</script>

<div class="container">
	<div class="wrap">
		{#if $resign.resigner !== $player}
			Your opponent has resigned the game.
		{:else}
			You have resigned the game.
		{/if}
		<img src="/resign.png" class="icon" />
		<div class="linkbox">
			<a href="/game" on:click={() => ($resign = { resigned: false, resigner: '' })}
				>Start a new game</a
			>
			<a href="/profile" on:click={() => ($resign = { resigned: false, resigner: '' })}
				>Go to profile</a
			>
		</div>
	</div>
</div>

<style>
	.container {
		position: absolute;
		justify-content: center;
		height: 100%;
		width: 100%;
		background-color: var(--modalBg);
		transform: scale(1);
		z-index: 100;
		display: flex;
	}
	.wrap {
		margin: auto;
		background-color: black;
		padding: 2rem;
		padding-inline: 4rem;
		border: lightgray solid 0.5px;
		border-radius: 5px;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
			rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
		color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}
	.linkbox {
		margin-top: 1rem;
	}
	a {
		color: grey;
		margin: 1rem;
	}
	.icon {
		height: 2rem;
		width: auto;
		margin-top: 1rem;
	}
</style>
