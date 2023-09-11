<script lang="ts">
</script>

<div class="container">
	<div class="wrap">Game has ended</div>
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
</style>
