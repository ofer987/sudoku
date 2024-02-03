<script lang="ts">
	import { Tile } from './puzzle';

	export let value: Tile;

	function isInputElement(): boolean {
		return !value.isOriginal;
	}

	function displayedValue(): string {
		if (value.current) {
			return value.current.toString();
		}

		return ' ';
	}

	function isCorrect(): boolean {
		return value.isCorrect;
	}
	// let answer = puzzle.answer;
	// let startingBoard = puzzle.board;
	//
	// let state = startingBoard;

	// const puzzle = generateSudokuPuzzle();
</script>

{#if isInputElement()}
	<input type="text" value={displayedValue()} />
{:else}
	<div class="tile" class:correct={isCorrect()}>
		{displayedValue()}
	</div>
{/if}

<style lang="scss">
	@import '@fontsource/fira-mono';

	.tile {
		font-family: 'Fira Mono';
		font-size: 1em;

		display: grid;
		color: red;

		&.correct {
			color: blue;
		}

	input {
		width: 1em;
		height: 1em;
	}
</style>
