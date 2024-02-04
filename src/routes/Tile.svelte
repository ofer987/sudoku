<script lang="ts">
	import { store, DEFAULT_VALUE } from './indexStore';
	import lodash from 'lodash';
	const { floor } = lodash;
	import { Tile } from './puzzle';

	export let tile: Tile;
	let isTileSelected = false;
	let isRowSelected = false;
	let isColumnSelected = false;
	let isSquareSelected = false;

	store.subscribe((value: number) => {
		isTileSelected = false;
		isRowSelected = false;
		isColumnSelected = false;
		isSquareSelected = false;

		if (value == DEFAULT_VALUE) {
			return;
		}

		if (tile.index == value) {
			isTileSelected = true;

			return;
		}

		const row = floor(value / 9);
		const column = value % 9;
		for (let i = row * 9; i < (row + 1) * 9; i += 1) {
			if (tile.index == i) {
				isRowSelected = true;
				break;
			}
		}

		for (let j = column; j < 81; j += 9) {
			if (tile.index == j) {
				isColumnSelected = true;
				break;
			}
		}

		const squareRowStart = floor(row / 3) * 3;
		const squareColumnStart = floor(column / 3) * 3;
		for (let i = squareRowStart; i < squareRowStart + 3; i += 1) {
			for (let j = squareColumnStart; j < squareColumnStart + 3; j += 1) {
				if (tile.index == i * 9 + j) {
					isSquareSelected = true;

					break;
				}
			}
		}
	});

	function select(): void {
		store.set(tile.index);
	}

	function unselect(): void {
		store.set(DEFAULT_VALUE);
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
</script>

<div
	class="grid-element"
	class:is-tile-selected={isTileSelected}
	class:correct={tile.isCorrect}
	class:is-row-selected={isRowSelected}
	class:is-column-selected={isColumnSelected}
	class:is-square-selected={isSquareSelected}
	on:blur={() => {}}
	on:mouseout={unselect}
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
			on:keyup={select}
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
			background-color: lightblue;
		}

		&.is-row-selected {
			background-color: grey;
		}

		&.is-column-selected {
			background-color: grey;
		}

		&.is-square-selected {
			background-color: turquoise;
		}

		&.is-tile-selected {
			background-color: green;
		}

		.tile {
			margin: 0 auto;
			font-family: 'Fira Mono';
			font-size: 1em;

			display: grid;
			color: red;

			&.correct {
				color: blue;
			}

			&.answer {
				display: block;
			}
		}
	}
</style>
