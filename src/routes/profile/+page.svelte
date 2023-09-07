<script>
	import { signOut } from 'firebase/auth';
	import Details from '../../components/Details.svelte';
	import GameDetails from '../../components/GameDetails.svelte';
	import { goto } from '$app/navigation';
</script>

<div class="gridWrap">
	<div class="grid">
		<Details />
		<GameDetails />
		<img src="battle.jpg" class="themeImg" />
	</div>
</div>

<style>
	.gridWrap {
		display: flex;
		justify-content: center;
		padding: 3rem;
		position: relative;
		background-image: url('greyBG.jpg');
	}
	.grid {
		display: grid;
		gap: 2rem;
		grid-template-columns: 40rem 20rem;
		grid-template-rows: 18rem 18rem;
		height: 62rem;
	}
	.themeImg {
		width: 40rem;
		height: 18rem;
	}
</style>
