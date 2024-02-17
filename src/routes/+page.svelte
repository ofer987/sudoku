<script lang="ts">
	import { page } from '$app/stores';
	import lodash from 'lodash';
	import { onMount } from 'svelte';
	const { toNumber } = lodash;

	import { generatePuzzleFromBase64Hash, generateSudokuPuzzle } from './puzzle';
	import Puzzle from './Puzzle.svelte';
	import NewGame from './NewGame.svelte';

	let puzzle: Puzzle | undefined;
	let isNewGameMenuDisabled = true;
	const hash = $page.url.hash;

	const getDifficultyLevel = (value: string): number | null => {
		const match = value.match(/level=(\d+)/i);
		if (!match) {
			return null;
		}

		const result = toNumber(match[1]);

		if (result < 1 || result > 4) {
			return 1;
		}

		return result;
	};

	let difficultyLevel: number | null;

	if (hash != '') {
		puzzle = generatePuzzleFromBase64Hash($page.url.hash.substring(1));
	}

	function startNewGame(): void {
		isNewGameMenuDisabled = false;
	}

	onMount(() => {
		difficultyLevel = getDifficultyLevel(window.location.search);
	});
</script>

<svelte:head>
	<title>sudoku (Puzzles generated using third-party library)</title>
</svelte:head>

<body>
	<div class="container">
		<h1>
			sudo<s>ku</s>
		</h1>
		{#if typeof puzzle != 'undefined'}
			<Puzzle {puzzle} disabled={!isNewGameMenuDisabled} />
		{:else}
			{#await generateSudokuPuzzle(difficultyLevel ?? 1)}
				<div>Loading</div>
			{:then resolvedPuzzle}
				<Puzzle puzzle={resolvedPuzzle} disabled={!isNewGameMenuDisabled} />
			{/await}
		{/if}

		<div
			class="new-game"
			on:click={startNewGame}
			on:keydown={startNewGame}
			role="button"
			tabindex="-1"
		>
			<label for="start-new-game">Start new game:</label>
			<input id="start-new-game" type="button" disabled={!isNewGameMenuDisabled} value="New Game" />
		</div>

		<NewGame bind:disabled={isNewGameMenuDisabled} />
	</div>
</body>

<style lang="scss">
	@import '@fontsource/fira-mono';

	body {
		font-family: 'Fira Mono';

		.container {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			column-gap: 0.5em;

			.new-game {
				display: flex;
				justify-content: space-between;
				width: 22em;
				font-size: 2em;
			}
		}
	}

	@media screen and (max-width: 1000px) {
		body {
			font-size: 18px;
		}
	}

	@media screen and (max-width: 900px) {
		body {
			font-size: 16px;
		}
	}

	@media screen and (max-width: 800px) {
		body {
			font-size: 14px;
		}
	}

	@media screen and (max-width: 700px) {
		body {
			font-size: 12px;
		}
	}

	@media screen and (max-width: 600px) {
		body {
			font-size: 10px;
		}
	}

	@media screen and (max-width: 500px) {
		body {
			font-size: 8px;
		}
	}
</style>
