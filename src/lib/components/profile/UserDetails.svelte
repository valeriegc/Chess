<script lang="ts">
	import { doc, updateDoc } from 'firebase/firestore';
	import { userPic } from '../../stores/stores';
	import { db } from '$lib/firebase/firebase';
	export let userEmail: string;
	export let userPw: string;
	export let userPicture: string;
	export let userName: string;
	export let open: boolean;
	export let uid: string;

	export const updateUserName = async () => {
		const userRef = doc(db, 'users', uid);
		await updateDoc(userRef, {
			userName: userName
		});
		editing = false;
	};
	$: editing = false;

	$userPic = userPicture;
</script>

<div class="detailWrap">
	<div style="margin-inline:auto">
		<h3>User details</h3>
		<div class="innerContainer">
			<div>
				<h4 class="detailHeaders">Username</h4>
				<div>
					<input
						class="userDetail"
						style="margin-bottom:3rem;"
						bind:value={userName}
						on:click={() => (editing = true)}
					/>
					{#if editing}
						<button on:click={updateUserName}>Save</button>
					{/if}
				</div>
				<h4 class="detailHeaders">Email</h4>
				<p class="userDetail">{userEmail}</p>
			</div>
			<div class="pictureContainer">
				<div class="picHeader">
					<p>Picture</p>
					<img class="icon" src="cam.png" on:click={() => (open = true)} />
				</div>
				<div class="userPic">
					<img src={$userPic} />
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.detailWrap {
		background-color: rgba(0, 0, 0, 0.562);
		border: none;
		width: 40rem;
		padding-block: 1.5rem;
		padding-inline: 2rem;
	}
	.innerContainer {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-right: 5rem;
	}
	.userDetail {
		font-size: small;
		font-weight: 400;
		margin-left: 1rem;
	}
	.detailHeaders {
		margin: 0.5rem;
	}
	h3 {
		margin: 0;
		margin-bottom: 1rem;
		font-size: 1.75rem;
		font-weight: 200;
	}
	input {
		height: 1.5rem;
		width: 10rem;
	}
	button {
		height: 1.5rem;
	}
	.icon {
		height: 2rem;
		width: auto;
		padding: 0.25rem;
		background-color: rgb(71, 70, 70);
		border-radius: 10px;
		border: 0;
		cursor: pointer;
	}
	.picHeader {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 0.5rem;
	}

	p {
		font-weight: 600;
		font-size: medium;
		color: whitesmoke;
	}
	.userPic {
		height: 8rem;
		width: 8rem;
		overflow: hidden;
		background-color: var(--secondary);
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
		border-radius: 100%;
	}
	img {
		height: 8rem;
		width: 8rem;
	}
</style>
