<script>
	let email = '';
	let password = '';
</script>

<div class="detailWrap">
	<div style="margin-inline:auto">
		<p style="margin:0; font-size:1.25rem;font-style:bold">User details</p>
		<div class="innerContainer">
			<div>
				<label>
					<p>Email</p>
					<input value={email} placeholder="User email displayed here" />
				</label>
				<button>Edit</button>
				<label>
					<p>Password</p>
					<input value={password} placeholder="Password hidden here" />
				</label>
				<button>Edit</button>
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
		background-color: white;
		border: none;
		width: 40rem;
		color: black;
		padding: 2rem;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
	}
	.innerContainer {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	input {
		width: 20rem;
		border: solid darkgrey 1px;
		height: 1.5rem;
		padding: 0.5rem;
	}
	.userPic {
		height: 8rem;
		width: 8rem;
		background-color: white;
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	}
	button {
		background-color: black;
		color: white;
		border: none;
		cursor: pointer;
	}
</style>
