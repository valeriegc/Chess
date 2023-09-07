<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { auth, db } from '$lib/firebase/firebase';
	import {
		GoogleAuthProvider,
		setPersistence,
		signInWithEmailAndPassword,
		signInWithPopup,
		browserSessionPersistence
	} from 'firebase/auth';
	import { doc, getDoc, setDoc } from 'firebase/firestore';
	import { userStore } from '../stores.js';

	let createAccount = false;
	let email = '';
	let password = '';
	let confirmationPassword = '';
	let loginError = false;
	export let form;
	export let success: boolean;
	let showError = true;

	$: if (success) {
		goto('/profile');
	}

	const singInWithGoogle = async () => {
		const provider = new GoogleAuthProvider();
		const credential = await signInWithPopup(auth, provider);
		const idToken = await credential.user.getIdToken();

		const res = await fetch('/api/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ idToken })
		});
		const userObj = auth.currentUser;
		const uid = userObj.uid;
		const userRef = doc(db, 'users', uid);

		if (userObj) {
			const userDoc = await getDoc(userRef);
			if (userDoc.exists()) {
				const userDetails = await getDoc(userRef);
				const userData = userDetails.data();
				if (userData) {
					$userStore = {
						email: userData.email,
						picture: userData.picture,
						theme: userData.theme,
						lost: userData.lost,
						won: userData.won,
						played: userData.played,
						uid: userObj.uid
					};
				}
				document.documentElement.dataset.theme = 'traditional';
			} else {
				await setDoc(doc(db, 'users', userObj.uid), {
					email: userObj?.email,
					theme: 'bw',
					picture: '',
					played: 0,
					lost: 0,
					won: 0,
					uid: uid
				});
			}
			goto('/profile');
		}
	};

	const regularSignIn = async () => {
		setPersistence(auth, browserSessionPersistence);
		try {
			const { user } = await signInWithEmailAndPassword(auth, email, password);
			const idToken = await user.getIdToken();
			const res = await fetch('/api/signin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ idToken })
			});
			if (user) {
				const uid = user.uid;
				const userRef = doc(db, 'users', uid);
				const userDoc = await getDoc(userRef);
				if (userDoc.exists()) {
					const userDetails = await getDoc(userRef);
					const userData = userDetails.data();
					if (userData) {
						$userStore = {
							email: userData.email,
							picture: userData.picture,
							theme: userData.theme,
							lost: userData.lost,
							won: userData.won,
							played: userData.played,
							uid: userData.uid
						};
						document.documentElement.dataset.theme = 'traditional';
					}
				}
			}
			goto('/profile');
		} catch (error) {
			//TO DO: Find a correct error type
			if (error instanceof Error) {
				const errorCode = error.code;
				const errorMessage = error.message;
			}
		}
	};

	// BELOW THE OTHER SOLUTION

	// When the user signs in with email and password.
</script>

<div class="pageWrap">
	<div class="header">CHESS</div>
	<img class="mainImg" src="centralPieces.png" />
	<div class="formContainer">
		<div class="formWrap">
			<div class="formChoices">
				<button
					class="choiceBtn"
					style="border-bottom:{createAccount ? 'none' : 'solid 1px whitesmoke'}"
					on:click={() => (createAccount = false)}>Log in</button
				>
				<button
					class="choiceBtn"
					on:click={() => (createAccount = true)}
					style="border-bottom:{!createAccount ? 'none' : 'solid 1px whitesmoke'}">Sign up</button
				>
			</div>
			<form method="POST" use:enhance>
				<input name="email" type="email" placeholder="Email" bind:value={email} />
				<input name="password" type="password" placeholder="Password" bind:value={password} />
				{#if createAccount}
					<input name="confirmPassword" type="password" placeholder="Confirm Password" />
				{/if}

				{#if loginError && showError}
					<div class="error">
						{loginError}
						<div class="closeError">x</div>
					</div>
				{/if}
				{#if form?.detailsMissing && showError}
					<div class="error" on:click={() => (showError = false)}>
						Please fill in all the fields
						<div class="closeError">x</div>
					</div>
				{/if}
				{#if form?.passwordError && showError}
					<div class="error" on:click={() => (showError = false)}>
						{form?.passwordError}
						<div class="closeError">x</div>
					</div>
				{/if}
				{#if form?.passwordMismatch && showError}
					<div class="error" on:click={() => (showError = false)}>
						The password and confirmation password do not match.
						<div class="closeError">x</div>
					</div>
				{/if}

				<button
					on:click={() => (createAccount ? '' : regularSignIn())}
					type={createAccount ? 'submit' : 'button'}
					>{createAccount ? ' Sign up' : 'Login'}
				</button>
				<button on:click={singInWithGoogle} class="googleBtn" type="button">
					<img src="googleWhite.png" width="20" height="20" alt="logo of google" />
					{createAccount ? ' Sign up' : 'Login'} with Google</button
				>
				<div class="linkBox">
					<p class="option">Forgot your password?</p>
					<p class="option">Continue without registration</p>
				</div>
			</form>
		</div>
	</div>
	<div />
</div>

<style>
	.pageWrap {
		display: flex;
		height: 100vh;
		flex-direction: row;
		position: relative;
		background-color: black;
		background-image: url('greyBG.jpg');
	}
	.header {
		position: absolute;
		font-size: 9rem;
		left: 18rem;
		top: 19rem;
		color: rgb(245, 245, 245);
	}
	.mainImg {
		margin-left: 5rem;
		margin-top: 7rem;
		height: 20rem;
		width: 50%;
	}
	.formContainer {
		width: 26rem;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		background-color: black;
		background-image: url('greyBG.jpg');
	}
	.formWrap {
		margin: auto;
		width: 90%;
	}
	.formChoices {
		margin: 1rem;
		margin-left: 0;
	}
	.choiceBtn {
		background-color: transparent;
	}
	.choiceBtn:hover {
		background-color: transparent;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	.googleBtn {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
	}
	.error {
		color: lightpink;
		margin: 0;
		position: relative;
	}
	.closeError {
		color: lightpink;
		position: absolute;
		right: 0;
		top: 0;
		font-size: medium;
		cursor: pointer;
	}
	.linkBox {
		display: flex;
		flex-direction: row;
		font-size: small;
		justify-content: space-between;
		padding-inline: 0.5rem;
	}
	.option:hover {
		color: darkgray;
		cursor: pointer;
	}
</style>
