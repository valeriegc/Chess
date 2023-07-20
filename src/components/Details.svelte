<script>
	let email = '';
	let password = '';
</script>

<div class="detailWrap">
	<div style="margin-inline:auto">
		<p style="margin:0; font-size:1.25rem;font-style:bold">USER DETAILS</p>
		<div class="innerContainer">
			<div>
				<label>
					<p>EMAIL</p>
					<input value={email} placeholder="User email displayed here" />
				</label>
				<button>EDIT</button>
				<label>
					<p>PASSWORD</p>
					<input value={password} placeholder="Password hidden here" />
				</label>
				<button>EDIT</button>
			</div>
			<div class="pictureContainer">
				<p>PICTURE</p>
				<div class="userPic" />
			</div>
		</div>
	</div>
</div>

<style>
	.detailWrap {
		background-color: var(--lightSquare);
		border: solid 1px var(--lightSquare);
		border-radius: 30px;
		width: 40rem;
		color: var(--darkSquare);
		padding: 2rem;
		height: 16rem;
	}
	.innerContainer {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	input {
		width: 20rem;
		border: none;
		border-radius: 5px;
		height: 1.5rem;
	}
	.userPic {
		height: 8rem;
		width: 8rem;
		background-color: white;
	}
</style>
