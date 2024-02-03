<script lang="ts">
	import { generateSudokuPuzzle } from './puzzle';
	import Puzzle from './Puzzle.svelte';

	const puzzle = generateSudokuPuzzle();
</script>

<svelte:head>
	<title>Dan's Sudoku (Puzzles generated using third-party library)</title>
</svelte:head>

{#await puzzle then resolvedPuzzle}
	<Puzzle puzzle={resolvedPuzzle} />
{/await}

<style lang="scss">
	@import '@fontsource/fira-mono';

	.puzzle {
		font-family: 'Fira Mono';

		display: grid;
		grid-template-rows: 2em 2em 2em 2em 2em 2em 2em 2em 2em;
		grid-template-columns: 2em 2em 2em 2em 2em 2em 2em 2em 2em;
		align-items: center;
		justify-items: center;
	}
</style>
