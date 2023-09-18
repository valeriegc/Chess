<script>
	import { letters } from '$lib/functions/rendering/board';
	export let player;
</script>

<div class="boardOuterWrap">
	<div class="boardX">
		{#each letters as letter}
			<div class="letters">{letter}</div>
		{/each}
	</div>
	<div class="boardInnerWrap">
		<div class="boardY">
			<div class="boardY">
				{#if player == 'black'}
					{#each { length: 8 } as _, i}
						<div class="numbers">{i + 1}</div>
					{/each}
				{:else}
					{#each { length: 8 } as _, i}
						<div class="numbers">{8 - i}</div>
					{/each}
				{/if}
			</div>
		</div>
		<slot />
		<div class="boardY">
			{#if player == 'black'}
				{#each { length: 8 } as _, i}
					<div class="numbers">{i + 1}</div>
				{/each}
			{:else}
				{#each { length: 8 } as _, i}
					<div class="numbers">{8 - i}</div>
				{/each}
			{/if}
		</div>
	</div>
	<div class="boardX">
		{#each letters as letter}
			<div class="letters">{letter}</div>
		{/each}
	</div>
</div>

<style>
	.boardOuterWrap {
		display: flex;
		flex-direction: column;
		margin-left: 3rem;
		position: relative;
	}
	.boardX {
		display: flex;
		height: 40px;
		padding-inline: 40px;
	}
	.letters {
		width: 70px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: whitesmoke;
	}
	.boardInnerWrap {
		display: flex;
	}
	.boardY {
		height: 100%;
		width: 40px;
	}
	.numbers {
		height: 70px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: whitesmoke;
	}
</style>
