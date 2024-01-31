<script lang="ts">
	import { Tile } from './puzzle';

	export let value: Tile;

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

<div class="tile" class:correct={isCorrect()}>{displayedValue()}</div>

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
	}
</style>
