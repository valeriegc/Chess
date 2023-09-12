<script>
	import Details from '../../components/Details.svelte';
	import GameDetails from '../../components/GameDetails.svelte';
	export let data;
	let userData = data.userData;
</script>

{#if userData}
	<div class="gridWrap">
		<div class="grid">
			<Details userEmail={userData.email} userPw={''} userPicture={userData.picture} />
			<GameDetails played={userData.played} lost={userData.lost} won={userData.won} />
			<img src="battle.jpg" class="themeImg" />
		</div>
	</div>
{/if}

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
