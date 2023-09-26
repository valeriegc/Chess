<script>
	import ChangePic from '$lib/components/profile/ChangePic.svelte';
	import UserDetails from '$lib/components/profile/UserDetails.svelte';
	import Stats from '$lib/components/profile/Stats.svelte';
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
			<UserDetails
				bind:open
				userEmail={userData.email}
				userPw={''}
				userPicture={userData.picture}
				userName={userData.userName}
				uid={userData.uid}
			/>
			<Stats played={userData.played} lost={userData.lost} won={userData.won} />
			<img alt="chess pieces in battle" src="battle.jpg" class="themeImg" />
		</div>
	</div>
{/if}

<style>
	.gridWrap {
		display: flex;
		justify-content: center;
		padding: 3rem;
		position: relative;
		background-image: url('/greyBG.jpg');
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
