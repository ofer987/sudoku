<script lang="ts">
	import { page } from '$app/stores';
	import lodash from 'lodash';
	const { toNumber } = lodash;

	import {
		generatePuzzleFromBase64Hash,
		generateSudokuPuzzle,
		DIFFUCLTY_LEVEL_SEARCH_PARAM
	} from './puzzle';
	import Puzzle from './Puzzle.svelte';
	import NewGame from './NewGame.svelte';

	let puzzle: Puzzle | undefined;
	let isNewGameMenuDisabled = true;

	if ($page.url.hash != '') {
		puzzle = generatePuzzleFromBase64Hash($page.url.hash.substring(1));
	}

	const getDifficultLevel = () => {
		const value = toNumber($page.url.searchParams.get(DIFFUCLTY_LEVEL_SEARCH_PARAM) || '1');
		if (value >= 1 && value <= 4) {
			return value;
		}

		return 1;
	};

	const difficultyLevel = getDifficultLevel();

	function startNewGame(): void {
		isNewGameMenuDisabled = false;
	}
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
			{#await generateSudokuPuzzle(difficultyLevel) then resolvedPuzzle}
				<Puzzle puzzle={resolvedPuzzle} disabled={!isNewGameMenuDisabled} />
			{/await}
		{/if}

		<div class="new-game">
			<label for="start-new-game">Start a new game:</label>
			<input
				id="start-new-game"
				type="button"
				on:click={startNewGame}
				disabled={!isNewGameMenuDisabled}
				value="New Game"
			/>
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

			.new-game {
				display: flex;
				justify-content: space-between;
				width: 44em;
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
