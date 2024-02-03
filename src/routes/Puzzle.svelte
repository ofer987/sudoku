<script lang="ts">
	import { Puzzle } from './puzzle';
	import Tile from './tile.svelte';

	export let puzzle: Puzzle;
	let startingBoard = puzzle.board;

	let state = startingBoard;
</script>

<svelte:head>
	<title>Dan's Sudoku (Puzzles generated using third-party library)</title>
</svelte:head>

<div class="puzzle">
	{#each state as value}
		<Tile tile={value} />
	{/each}
</div>

<style lang="scss">
	@import '@fontsource/fira-mono';

	.puzzle {
		font-family: 'Fira Mono';

		/* padding: 500px; */
		display: grid;
		grid-template-rows: 4em 4em 4em 4em 4em 4em 4em 4em 4em;
		grid-template-columns: 4em 4em 4em 4em 4em 4em 4em 4em 4em;
		align-items: center;
		justify-items: center;
	}
</style>
