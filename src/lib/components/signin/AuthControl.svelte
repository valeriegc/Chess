<script lang="ts">
	import { db, user } from '$lib/firebase/firebase';
	import { doc, getDoc } from 'firebase/firestore';
	import { userStore } from '../../../stores';

	const getUser = async () => {
		const userData = await getDoc(doc(db, 'users', $user.uid));
		if (userData.exists()) {
			const finalData = userData.data();
			$userStore = {
				email: finalData.email,
				picture: finalData.picture,
				lost: finalData.lost,
				won: finalData.won,
				played: finalData.played,
				uid: finalData.uid
			};
		}
	};

	if ($user) {
		getUser();
	}
</script>

{#if $user}
	<slot />
{:else}
	<div class="outerAuthWrap">
		<div class="innerAuthWrap">
			<p>You must be signed in to enter this page</p>
			<a href="/">Sign in here</a>
		</div>
	</div>
{/if}

<style>
	.outerAuthWrap {
		display: flex;
		background: black;
		background-image: url('greyBG.jpg');
		height: 100vh;
	}
	.innerAuthWrap {
		margin: auto;
		text-align: center;
		background-color: rgba(245, 245, 245, 0.729);
		padding: 2.5rem;
		border-radius: 10px;
	}
	p {
		font-size: 1.5rem;
		color: black;
	}
	a {
		color: black;
		font-size: large;
	}
</style>
