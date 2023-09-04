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
				<img src="editDark" />
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
		background-color: var(--secondary);
		border: none;
		width: 40rem;
		padding: 2rem;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
	}
	.innerContainer {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	input {
		width: 18rem;
		border: solid var(--tertiary) 1px;
		height: 1.6rem;
		margin: 0;
	}
	p {
		font-weight: 700;
	}
	.userPic {
		height: 8rem;
		width: 8rem;
		background-color: var(--secondary);
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	}
</style>
