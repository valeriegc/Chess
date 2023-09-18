<script lang="ts">
	import { winner, player } from '../../../stores/stores';
</script>

<div class="container">
	<div class="wrap">
		{#if $winner == $player}
			Congratulations! You have won the game.
			<img src="/win.png" class="icon" />
		{:else}
			You lost, the {$winner} was victorious.
			<img src="/lose.png" class="icon" />
		{/if}
		<div>
			<a href="/game" on:click={() => ($winner = '')}>Start a new game</a>
			<a href="/profile on:click={() => ($winner = '')}">Go to profile</a>
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
		box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
			rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
		color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}
	.icon {
		height: 2rem;
		width: auto;
		margin: 1rem;
	}
	a {
		margin: 1rem;
		color: lightgrey;
	}
</style>
