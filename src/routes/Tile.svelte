<script lang="ts">
	import { store } from './indexStore';
	import lodash from 'lodash';
	const { floor } = lodash;
	import { Tile } from './puzzle';

	export let tile: Tile;
	// export let isSelected;
	const valueChoices = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	// function setValue(newValue: number) {
	// 	tile.current = newValue;
	// }

	// const store = writable(0);
	let isSelected = false;

	// let selectedIndex: number | null = null;

	store.subscribe((value: number) => {
		isSelected = false;
		// alert(value);
		// selectedIndex = value;

		const row = floor(value / 9);
		const column = value % 9;
		// alert(`Selected row is ${row}`);
		for (let i = row * 9; i < (row + 1) * 9; i += 1) {
			if (tile.index == i) {
				// alert(`tile: ${tile.index} is selected too!`);
				isSelected = true;
				// return;
			}
		}

		// alert(`Selected column is ${column}`);
		for (let j = column; j < 81; j += 9) {
			if (tile.index == j) {
				// alert(`tile: ${tile.index} is selected too!`);
				isSelected = true;
				// return;
			}
		}
	});
	// store.subscribe

	function select(): void {
		// alert(`selected: ${tile.index}`);
		// alert(`Row is ${floor(tile.index / 9)}`);
		// alert(`Column is ${tile.index % 9}`);
		store.set(tile.index);
	}

	function isInputElement(): boolean {
		return !tile.isOriginal;
	}

	function displayedValue(): string {
		if (tile.current) {
			return tile.current.toString();
		}

		return ' ';
	}

	const isCorrect = (): boolean => {
		return tile.isCorrect;
	};

	$: isCorrect();

	// const isSelected = () => {};
	// let answer = puzzle.answer;
	// let startingBoard = puzzle.board;
	//
	// let state = startingBoard;

	// const puzzle = generateSudokuPuzzle();
</script>

<div
	class="grid-element"
	class:correct={tile.isCorrect}
	class:is-selected={isSelected}
	on:mouseover={select}
	on:focus={select}
	aria-level="1"
	role="heading"
>
	{#if isInputElement()}
		<input
			class="tile"
			type="number"
			class:correct={tile.isCorrect}
			min="1"
			max="9"
			bind:value={tile.current}
		/>
	{:else}
		<div class="tile answer" class:correct={tile.isCorrect}>
			{displayedValue()}
		</div>
	{/if}
</div>

<style lang="scss">
	@import '@fontsource/fira-mono';

	.grid-element {
		width: 100%;
		height: 100%;
		background-color: red;
		display: flex;
		justify-content: center;
		align-items: center;

		&.correct {
			/* background-color: black; */
			background-color: lightblue;
			/* border-top-width: 1em; */
			/* border-bottom-width: 1em; */
			/* border-left-width: 1em; */
			/* border-right-width: 1em; */
		}

		&.is-selected {
			background-color: grey;
		}

		&:hover {
			background-color: green;
		}

		.tile {
			margin: 0 auto;
			font-family: 'Fira Mono';
			font-size: 1em;

			display: grid;
			/* background-color: blue; */
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
	}
</style>
