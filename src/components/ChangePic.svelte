<script lang="ts">
	import { auth, db } from '$lib/firebase/firebase';
	import { userPic } from '../stores';
	import { doc, updateDoc } from 'firebase/firestore';
	export let open = true;

	const firebaseUser = auth.currentUser;
	const uid = auth.currentUser!.uid;

	const setImageToFirebase = async () => {
		let userRef = doc(db, 'users', uid);
		await updateDoc(userRef, {
			picture: imageLink
		});
		open = false;
		$userPic = imageLink;
	};

	let imageLink = '';
</script>

<div class="container">
	<div class="wrap">
		<div class="header">
			<h4>Change your picture</h4>
			<img src="/close.png" class="icon" on:click={() => (open = false)} />
		</div>
		<div class="imgBox">
			<img src={imageLink == '' ? $userPic : imageLink} class="userPic" />
		</div>
		<p>Input a link for the image below</p>
		<div class="inputWrap">
			<input bind:value={imageLink} /><button class="setBtn" on:click={() => setImageToFirebase()}
				>Set image</button
			>
		</div>
	</div>
</div>

<style>
	.container {
		position: absolute;
		justify-content: center;
		height: 100vh;
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
		gap: 0.5rem;
	}
	h4 {
		width: 100%;
		text-align: center;
		margin-bottom: 1rem;
	}
	p {
		font-size: small;
		margin: 0;
		justify-self: flex-start;
	}
	input {
		height: 1.5rem;
	}
	.inputWrap {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		height: 1.5rem;
	}
	.setBtn {
		background-color: rgb(94, 90, 90);
		padding-inline: 1rem;
		font-size: small;
		border-radius: 5px;
		border: none;
		height: 1.5rem;
	}
	.imgBox {
		height: 8rem;
		width: 8rem;
		background-color: white;
		align-self: center;
		margin-bottom: 2rem;
		margin-top: 1rem;
		border-radius: 100%;
		overflow: hidden;
	}
	.userPic {
		height: 8rem;
		width: 8rem;
	}
	.header {
		position: relative;
	}
	.icon {
		position: absolute;
		height: 1.5rem;
		width: auto;
		right: -1.5rem;
		top: 1rem;
		cursor: pointer;
	}
</style>
