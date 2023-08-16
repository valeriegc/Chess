<script>
	import Board from '../../../components/Board.svelte';
	import MoveBox from '../../../components/MoveBox.svelte';
</script>

<div class="container">
	<MoveBox />
	<Board />
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
		padding: 2rem;
		width: 1300px;
	}
</style>
