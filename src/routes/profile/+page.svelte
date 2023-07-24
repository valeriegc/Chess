<script>
	import Details from '../../components/Details.svelte';
	import GameDetails from '../../components/GameDetails.svelte';
	import Settings from '../../components/Settings.svelte';
</script>

<div class="gridWrap">
	<div class="grid">
		<Details />
		<GameDetails />
		<Settings />
	</div>
</div>

<style>
	* {
		margin: 0;
	}
	.gridWrap {
		display: flex;
		justify-content: center;
		padding: 3rem;
	}
	.grid {
		display: grid;
		gap: 2rem;
		grid-template-columns: 40rem 20rem;
		grid-template-rows: 18rem 18rem;
		height: 62rem;
	}
</style>
