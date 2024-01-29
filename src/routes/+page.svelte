<script lang="ts">
	import { generateSudokuPuzzle } from './puzzle';

	const puzzle = generateSudokuPuzzle();
</script>

<svelte:head>
	<title>Dan's Sudoku (Puzzles generated using third-party library)</title>
</svelte:head>

<div class="puzzle">
	{#await puzzle then resolvedPuzzle}
		{#each resolvedPuzzle.answer as value}
			<div class="tile">{value}</div>
		{/each}
	{/await}
</div>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

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
