<script>
	let email = 'testEmail';
	let password = '';
</script>

<div class="detailWrap">
	<div style="margin-inline:auto">
		<p style="margin:0; font-size:1.75rem;font-weight:200">User details</p>
		<div class="innerContainer">
			<div>
				<label>
					<p>Email</p>
					<p style="font-weight:200">{email}</p>
				</label>
				<label>
					<p>Password</p>
					<input value={password} placeholder="Password hidden here" />
				</label>
			</div>
			<div class="pictureContainer">
				<p>Picture</p>
				<div class="userPic" />
			</div>
		</div>
	</div>
</div>

<style>
	.detailWrap {
		background-color: rgba(0, 0, 0, 0.562);
		border: none;
		width: 40rem;
		padding: 2rem;
	}
	.innerContainer {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	p {
		font-weight: 700;
		color: whitesmoke;
	}
	.userPic {
		height: 8rem;
		width: 8rem;
		background-color: var(--secondary);
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	}
</style>
