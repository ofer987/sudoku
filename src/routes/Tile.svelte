<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { store, DEFAULT_VALUE } from './indexStore';
	import { Tile } from './tile';

	import lodash from 'lodash';
	const { floor, toNumber, isNumber } = lodash;

	export let tile: Tile;
	export let isBeginnerMode: boolean;
	export let disabled = false;

	const dispatch = createEventDispatcher();

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
		return !tile.isAnswered;
	}

	function displayedValue(): string {
		if (tile.current) {
			return tile.current.toString();
		}

		return ' ';
	}

	function setValue(event: KeyboardEvent): void {
		select();

		const newValue = toNumber(event.key);
		const target = event.target as HTMLInputElement;

		if (!target) {
			return;
		}

		if (/shift|arrow|tab/i.test(event.key)) {
			dispatch();
			return;
		}

		target.value = '';
		if (!isNumber(newValue)) {
			event.preventDefault();
			return;
		}

		if (newValue >= 1 && newValue <= 9) {
			dispatch();
		} else {
			target.value = tile.current;
			event.preventDefault();
		}
	}
</script>

<div
	class="grid-element"
	class:is-tile-selected={!disabled && isTileSelected}
	class:answer={tile.isAnswered}
	class:is-row-selected={!disabled && isRowSelected}
	class:is-column-selected={!disabled && isColumnSelected}
	class:is-square-selected={!disabled && isSquareSelected}
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
			class:correct={isBeginnerMode && tile.isCorrect}
			class:is-tile-selected={isTileSelected}
			min="1"
			max="9"
			inputmode="numeric"
			on:mouseup={() => {
				dispatch('numberChanged');
				select();
			}}
			on:keydown={setValue}
			bind:value={tile.current}
			{disabled}
		/>
	{:else}
		<div
			class="tile answer"
			class:answer={tile.isAnswered}
			class:is-square-selected={isSquareSelected}
			class:is-tile-selected={isTileSelected}
			class:is-row-selected={isRowSelected}
			class:is-column-selected={isColumnSelected}
		>
			{displayedValue()}
		</div>
	{/if}
</div>

<style lang="scss">
	.grid-element {
		width: 100%;
		height: 100%;
		background-color: grey;
		display: flex;
		justify-content: center;
		align-items: center;

		&.answer {
			background-color: lightblue;
		}

		&.is-row-selected {
			background-color: turquoise;
		}

		&.is-column-selected {
			background-color: turquoise;
		}

		&.is-square-selected {
			background-color: turquoise;
		}

		&.is-tile-selected {
			background-color: green;
		}

		input.tile {
			-webkit-appearance: none;
			-webkit-border-radius: 0;
			border-width: 0;
			border-radius: 0;

			&.correct {
				color: blue;
				background-color: white;
			}
		}

		.tile {
			margin: 0 auto;
			font-family: 'Fira Mono';
			text-align: center;
			font-size: 2em;
			width: 1em;
			background-color: white;

			display: grid;
			color: red;

			&.answer {
				color: green;
				background-color: white;
			}

			&.is-row-selected {
				background-color: white;
			}

			&.is-column-selected {
				background-color: white;
			}

			&.is-square-selected {
				background-color: white;
			}

			&.answer {
				display: block;
				background-color: white;
			}

			&::-webkit-inner-spin-button,
			&::-webkit-outer-spin-button {
				appearance: none;
			}
		}
	}
</style>
