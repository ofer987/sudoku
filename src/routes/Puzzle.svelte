<script lang="ts">
	import { Puzzle } from './puzzle';
	import Tile from './Tile.svelte';

	export let puzzle: Puzzle;
	let startingBoard = puzzle.board;

	let state = startingBoard;

	function recordState(): void {
		history.pushState({}, 'next page', `#${puzzle.toHash}`);
	}
</script>

<svelte:head>
	<title>Dan's Sudoku (Puzzles generated using third-party library)</title>
</svelte:head>

<div class="puzzle">
	{#each state as value}
		<Tile bind:tile={value} on:numberChanged={recordState} />
	{/each}

	{#if puzzle.isCorrect}
		<div>Correct!</div>
	{:else}
		<div>Not correct yet!</div>
	{/if}
</div>

<style lang="scss">
	@import '@fontsource/fira-mono';

	.puzzle {
		font-family: 'Fira Mono';

		display: grid;
		grid-gap: 1em;
		grid-template-rows: 4em 4em 4em 4em 4em 4em 4em 4em 4em;
		grid-template-columns: 4em 4em 4em 4em 4em 4em 4em 4em 4em;
		align-items: center;
		justify-items: center;
	}
</style>
