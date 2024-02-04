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
