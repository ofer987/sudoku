<script lang="ts">
	import { generatePuzzleFromBase64Hash, generateSudokuPuzzle } from './puzzle';
	import Puzzle from './Puzzle.svelte';

	let puzzle: Puzzle | undefined;
	// let awaitedPuzzle: Promise<Puzzle> | undefined;

	if ($page.url.hash != '') {
		puzzle = generatePuzzleFromBase64Hash($page.url.hash.substring(1));
	}
	// else {
	// 	awaitedPuzzle = generateSudokuPuzzle();
	// }

	import { page } from '$app/stores';

	console.log($page.url.hash);
</script>

<svelte:head>
	<title>Dan's Sudoku (Puzzles generated using third-party library)</title>
</svelte:head>

{#if typeof puzzle != 'undefined'}
	<Puzzle {puzzle} />
{:else}
	{#await generateSudokuPuzzle() then resolvedPuzzle}
		<Puzzle puzzle={resolvedPuzzle} />
	{/await}
{/if}
