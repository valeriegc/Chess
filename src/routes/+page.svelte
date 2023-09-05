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
	<div class="styleHeader">CHESS</div>
	<img class="bgFront" src="centralPieces.png" />
	<form method="POST" use:enhance>
		<input name="email" type="email" placeholder="Email" bind:value={email} />
		<input name="password" type="password" placeholder="Password" bind:value={password} />
		{#if createAccount}
			<input name="confirmPassword" type="password" placeholder="Confirm Password" />
		{/if}

		{#if loginError}
			<p style="color:gray">{loginError}</p>
		{/if}
		{#if form?.detailsMissing}
			<p style="color:red">Please fill in all the fields</p>
		{/if}
		{#if form?.passwordError}
			<p style="color:red; width:18rem;">{form?.passwordError}</p>
		{/if}
		{#if form?.passwordMismatch}
			<p style="color:red; width:18rem;">The password and confirmation password do not match.</p>
		{/if}

		<button
			on:click={() => (createAccount ? '' : regularSignIn())}
			type={createAccount ? 'submit' : 'button'}>Log in</button
		>
		<button on:click={singInWithGoogle} class="signInBtn" type="button"
			><div style="margin-right:1rem">
				<img src="googleLogo.png" width="20" height="20" alt="logo of google" />
			</div>
			Sign {createAccount ? 'up' : 'in'} with Google</button
		>
		<p
			class="choices"
			style="padding:0.5rem"
			on:click={() => (createAccount ? (createAccount = false) : (createAccount = true))}
		>
			{createAccount ? 'Back to login' : 'Create an account'}
		</p>
		<p class="choices">Forgot your password?</p>
	</form>

	<div />
</div>

<style>
	* {
		margin: 0;
	}
	.styleHeader {
		position: absolute;
		font-size: 10rem;
		left: 15rem;
		top: 2rem;
		color: rgba(33, 39, 52, 0.719);
	}
	.pageWrap {
		background: whitesmoke;
		min-height: 100vh;
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.bgFront {
		margin-top: 16rem;
		margin-left: 8rem;
		height: 20rem;
		width: 50%;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin: auto;
		margin-right: 4rem;
	}

	input:focus-within,
	input:hover {
		border: 2px var(--primary) solid;
	}

	input {
		width: 100%;
		height: 2.5rem;
		border: solid 1px rgba(33, 39, 52, 0.719);
		color: rgba(33, 39, 52, 0.719);
		font-size: large;
		padding-inline: 0.5rem;
		background-color: transparent;
	}
	input::placeholder {
		color: rgba(33, 39, 52, 0.719);
	}
	input:focus {
		outline: none;
	}
	button {
		height: 2.75rem;
		border: none;
		background-color: var(--primary);
		font-size: 1.25rem;
		font-weight: 900;
	}
	button:hover {
		transition-duration: 0.5;
		background-color: var(--secondary);
		border: var(--primary) 2px solid;
		color: var(--primary);
	}
	.signInBtn {
		background: var(--secondary);
		border: var(--primary) solid 1px;
		color: var(--primary);
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.5rem;
	}
	.choices {
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.choices:hover {
		cursor: pointer;
		color: var(--tertiary);
	}
</style>
