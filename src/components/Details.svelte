<script>
	import { userPic } from '../stores';
	export let userEmail;
	export let userPw;
	export let userPicture;
	export let userName;
	export let open;

	$userPic = userPicture;
</script>

<div class="detailWrap">
	<div style="margin-inline:auto">
		<p style="margin:0; font-size:1.75rem;font-weight:200">User details</p>
		<div class="innerContainer">
			<div>
				<label>
					<p>Username</p>
					<p style="font-size:small">{userName}</p>
				</label>
				<label>
					<p>Email</p>
					<p style="font-weight:200;font-size:small">{userEmail}</p>
				</label>
				<label>
					<p>Password</p>
					<input value={userPw} placeholder="Password hidden here" />
				</label>
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
		padding: 1.5rem;
	}
	.innerContainer {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
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
