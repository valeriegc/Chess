<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/firebase/firebase';
	import {
		GoogleAuthProvider,
		setPersistence,
		signInWithEmailAndPassword,
		signInWithPopup,
		browserSessionPersistence
	} from 'firebase/auth';
	import ForgotPw from '$lib/components/signin/ForgotPw.svelte';

	let createAccount = false;
	let email = '';
	let password = '';
	let confirmationPassword = '';
	let loginError = false;
	export let form;
	let forgotPw = true;
	let open = false;
	let createAccountHover = false;
	let logInHover = false;

	$: console.log(form);
	$: if (form && form.success) {
		(email = form.newEmail), (password = form.newPassword);
		setTimeout(() => regularSignIn(), 500);
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
		goto('/profile');
	};

	const regularSignIn = async () => {
		setPersistence(auth, browserSessionPersistence);
		try {
			const { user } = await signInWithEmailAndPassword(auth, email, password);
			const idToken = await user.getIdToken();
			await fetch('/api/signin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ idToken })
			});
			goto('/profile');
		} catch (error) {
			if (error instanceof Error) {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error(error);
			}
		}
	};
</script>

<div class="pageWrap">
	<div class="header">CHESS</div>
	<img class="mainImg" src="centralPieces.png" />
	<div class="formContainer">
		<div class="formWrap">
			<div class="formChoices">
				<button
					on:mouseover={() => (logInHover = true)}
					on:mouseleave={() => (logInHover = false)}
					class="choiceBtn"
					style="border-bottom:{!createAccount || logInHover ? 'solid 1px whitesmoke' : ''}"
					on:click={() => (createAccount = false)}>Log in</button
				>
				<button
					on:mouseover={() => (createAccountHover = true)}
					on:mouseleave={() => (createAccountHover = false)}
					class="choiceBtn"
					on:click={() => (createAccount = true)}
					style="border-bottom:{createAccount || createAccountHover ? 'solid 1px whitesmoke' : ''}"
					>Sign up</button
				>
			</div>
			<form method="POST" use:enhance>
				<div class="contentWrap">
					<input name="email" type="email" placeholder="Email" bind:value={email} />
					<input name="password" type="password" placeholder="Password" bind:value={password} />
					{#if createAccount}
						<input name="confirmPassword" type="password" placeholder="Confirm Password" />
					{/if}
				</div>
				{#if loginError}
					<div class="notify" id="error">
						{loginError}
						<div class="closeError">x</div>
					</div>
				{/if}
				{#if form?.detailsMissing || form?.passwordError || form?.passwordMismatch}
					<div class="notify" id="error">
						{#if form?.detailsMissing}
							Please fill in all the fields
						{:else if form?.passwordError}
							{form.passwordError}
						{:else if form?.passwordMismatch}
							The passwords do not match.
						{/if}
					</div>
				{/if}
				<div class="contentWrap">
					<button
						on:click={() => (createAccount ? '' : regularSignIn())}
						type={createAccount ? 'submit' : 'button'}
						>{createAccount ? ' Sign up' : 'Login'}
					</button>
					<button on:click={singInWithGoogle} class="googleBtn" type="button">
						<img src="googleWhite.png" width="20" height="20" alt="logo of google" />
						{createAccount ? ' Sign up' : 'Login'} with Google</button
					>
				</div>
				<div class="linkBox">
					<p class="option" on:click={() => (open = true)}>Forgot your password?</p>
					<p class="option" on:click={() => goto('/game')}>Continue without registration</p>
				</div>
			</form>
		</div>
	</div>
	<div />
	{#if forgotPw && open}
		<ForgotPw bind:open />
	{/if}
</div>

<style>
	.pageWrap {
		display: flex;
		height: 100vh;
		flex-direction: row;
		position: relative;
		background-color: black;
		background-image: url('/greyBG.jpg');
	}
	.header {
		position: absolute;
		font-size: 9rem;
		left: 18rem;
		top: 19rem;
		color: whitesmoke;
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
		background-image: url('/greyBG.jpg');
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
		border-bottom: solid transparent 1px;
		border-radius: 0;
	}
	.choiceBtn:hover {
		background-color: transparent;
		color: whitesmoke;
	}
	.contentWrap {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		margin-bottom: 1rem;
	}
	.googleBtn {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
	}
	.notify {
		padding: 0.75rem;
		color: white;
		border-radius: 5px;
		font-size: small;
		margin-bottom: 1rem;
		position: relative;
	}
	#error {
		background-color: darkred;
	}
	#success {
		background-color: green;
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
