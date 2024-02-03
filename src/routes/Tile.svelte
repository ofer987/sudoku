<script lang="ts">
	import { Tile } from './puzzle';

	export let tile: Tile;
	const valueChoices = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	// function setValue(newValue: number) {
	// 	tile.current = newValue;
	// }

	function isInputElement(): boolean {
		return !tile.isOriginal;
	}

	function displayedValue(): string {
		if (tile.current) {
			return tile.current.toString();
		}

		return ' ';
	}

	function isCorrect(): boolean {
		return tile.isCorrect;
	}
	// let answer = puzzle.answer;
	// let startingBoard = puzzle.board;
	//
	// let state = startingBoard;

	// const puzzle = generateSudokuPuzzle();
</script>

{#if isInputElement()}
	<select class="tile" class:correct={tile.isCorrect} bind:value={tile.current}>
		{#each valueChoices as value}
			<option {value}>{value}</option>
		{/each}
	</select>
{:else}
	<div class="tile answer" class:correct={isCorrect()}>
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

		/* width: 4em; */
		/* height: 4em; */

		&.correct {
			color: blue;
		}

		&.answer {
			display: block;
		}
		/*  */
		/* &:not(:hover) { */
		/* 	display: block; */
		/* } */
	}

	select {
		width: 3em;
		height: 2em;
		/*  */
		/* &.correct { */
		/* 	color: blue; */
		/* } */
	}
</style>
