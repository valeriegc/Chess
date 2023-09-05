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
	<div class="formBox">
		<div class="formFrame">
			<div class="formChoices">
				<button class="choiceBtn" on:click={() => (createAccount = false)}>Log in</button>
				<button class="choiceBtn" on:click={() => (createAccount = true)}>Sign up</button>
			</div>
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
					<p style="color:red; width:18rem;">
						The password and confirmation password do not match.
					</p>
				{/if}

				<button
					on:click={() => (createAccount ? '' : regularSignIn())}
					type={createAccount ? 'submit' : 'button'}
					>{createAccount ? ' Sign up' : 'Login'}
				</button>
				<button on:click={singInWithGoogle} class="signInBtn" type="button"
					><div style="margin-right:1rem">
						<img src="googleLogo.png" width="20" height="20" alt="logo of google" />
					</div>
					{createAccount ? ' Sign up' : 'Login'} with Google</button
				>
				<p class="choices">Forgot your password?</p>
			</form>
		</div>
	</div>
	<div />
</div>

<style>
	* {
		margin: 0;
	}
	.styleHeader {
		position: absolute;
		font-size: 10rem;
		left: 18rem;
		top: 18rem;
		color: rgba(33, 39, 52, 0.719);
	}
	.pageWrap {
		background: white;
		min-height: 100vh;
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.bgFront {
		margin-left: 5rem;
		margin-top: 7rem;
		height: 20rem;
		width: 50%;
	}
	.formBox {
		width: 26rem;
		display: flex;
		flex-direction: column;
		background-color: whitesmoke;
		padding: 1rem;
		margin-left: 2rem;
	}
	.formFrame {
		margin: auto;
		width: 90%;
	}
	.formChoices {
		margin: 1rem;
		margin-left: 0;
	}
	.choiceBtn {
		font-weight: normal;
		font-size: medium;
		margin: 0;
		background-color: white;
		color: rgba(33, 39, 52, 0.719);
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	input:focus-within,
	input:hover {
		border: 1px var(--primary) solid;
	}

	input {
		height: 2rem;
		border: solid 0.5px rgba(33, 39, 52, 0.719);
		color: rgba(33, 39, 52, 0.719);
		font-size: medium;
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
		font-weight: normal;
	}
	button:hover {
		transition-duration: 0.5;
		background-color: var(--secondary);
		border: var(--primary) 1px solid;
		color: var(--primary);
	}
	.signInBtn {
		background: var(--secondary);
		color: var(--primary);
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.5rem;
	}
	.choices {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: small;
	}

	.choices:hover {
		cursor: pointer;
		color: var(--tertiary);
	}
</style>
