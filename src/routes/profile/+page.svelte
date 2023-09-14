<script>
	import ChangePic from '../../components/ChangePic.svelte';
	import Details from '../../components/Details.svelte';
	import GameDetails from '../../components/GameDetails.svelte';
	export let data;
	let open = false;
	let userData = data.userData;
</script>

{#if open && userData}
	<ChangePic bind:open />
{/if}

{#if userData}
	<div class="gridWrap">
		<div class="grid">
			<Details
				bind:open
				userEmail={userData.email}
				userPw={''}
				userPicture={userData.picture}
				userName={userData.userName}
				uid={userData.uid}
			/>
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
		height: 100vh;
	}
	.grid {
		display: grid;
		gap: 2rem;
		grid-template-columns: 40rem 20rem;
		grid-template-rows: 18rem 18rem;
	}
	.themeImg {
		width: 40rem;
		height: 18rem;
	}
</style>
