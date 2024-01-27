import { uniq, orderBy, floor, random } from 'lodash';

enum AddTo {
	Row,
	Column
}

class ExistingValueError extends Error {
	name: string;
	message: string;

	constructor(value: number) {
		super();

		this.name = value.toString();
		this.message = `${value} has already been included`;
	}
}

class Puzzle {
	tiles: number[] = [];
	// rows = [];
	// columns = [];
	// squares = [];

	Puzzle() {}

	private addTo: AddTo = AddTo.Row;

	push(value: number): void {
		console.log(`Trying number ${value}`);
		if (this.addTo == AddTo.Row) {
			this.tiles.push(value);
		}

		const rowNumber = floor((this.tiles.length - 1) / 9);
		const columnNumber = (this.tiles.length - 1) % 9;

		console.log(`It has ${this.tiles.length} tiles`);
		// console.log(`Row is number ${rowNumber}`);
		// console.log(`Column is number ${columnNumber}`);

		// validate
		if (!this.getRow(rowNumber).isUnique()) {
			this.tiles.pop();

			return;
		}

		console.log('Row is unique');

		if (!this.getColumn(columnNumber).isUnique()) {
			for (let i = 0; i < columnNumber; i += 1) {
				this.tiles.pop();
			}

			return;
		}

		// console.log('Column is unique');

		// if (!this.getSquare(rowNumber, columnNumber).isUnique()) {
		// 	this.tiles.pop();
		//
		// 	return;
		// }

		// console.log('Square is unique');
	}

	// private pop(): void {
	// 	this.tiles.pop();
	// }

	getRow(index: number): Series {
		if (index < 0 || index >= 9) {
			return new NilSeries();
		}

		const result = new Series();

		const start = index * 9;
		const end = (index + 1) * 9;
		for (let i = start; i < end; i += 1) {
			const value = this.tiles[i];

			// console.log(`Row (${i}): ${value}`);
			result.push(value);
		}

		return result;
	}

	getColumn(index: number): Series {
		if (index < 0 || index >= 9) {
			return new NilSeries();
		}

		const result = new Series();

		const start = index;
		const end = 72 + index + 1;
		for (let i = start; i < end; i += 9) {
			const value = this.tiles[i];

			// console.log(`Column (${i}): ${value}`);
			result.push(value);
		}

		return result;
	}

	getSquare(row: number, column: number): Series {
		if (row < 0 || row >= 9 || column < 0 || column >= 9) {
			return new NilSeries();
		}

		const result = new Series();

		const startRow = floor(row / 3) * 3;
		const startColumn = floor(column / 3) * 3;
		for (let i = startRow; i < startRow + 3; i += 3) {
			for (let j = startColumn; j < startColumn + 3; j += 3) {
				const index = i * 9 + j;
				const value = this.tiles[index];

				result.push(value);
			}
		}

		return result;
	}

	isValid(): boolean {
		for (let i = 0; i < 9; i += 1) {
			if (!this.getRow(i).isValid()) {
				return false;
			}

			if (!this.getColumn(i).isValid()) {
				return false;
			}
		}

		for (let i = 0; i < 9; i += 1) {
			for (let j = 0; j < 9; j += 1) {
				if (!this.getSquare(i, j).isValid()) {
					return false;
				}
			}
		}

		return true;
	}

	isFull(): boolean {
		return this.tiles.length == 81;
	}

	toString(): string {
		return this.tiles.join(' ');
	}
}

class NilPuzzle extends Puzzle {
	override isValid(): boolean {
		return false;
	}

	override isFull(): boolean {
		return false;
	}

	override toString(): string {
		return '';
	}
}

class Series {
	private values: number[] = [];

	constructor() {}

	push(value: number): void {
		if (typeof value === 'undefined') {
			return;
		}

		if (value <= 0 || value > 9) {
			throw new RangeError(`${value} is not within 1 - 9`);
		}

		// console.log(`Pushing number ${value}`);

		// if (this.values.includes(value)) {
		// 	throw new ExistingValueError(value);
		// }

		this.values.push(value);
	}

	get(index: number): number {
		return this.values[index];
	}

	isUnique(): boolean {
		return uniq(this.values).length == this.values.length;
	}

	isValid(): boolean {
		let result = 0;

		for (const value of uniq(this.values)) {
			if (value <= 0 || value > 9) {
				return false;
			}

			// 1 + 9 = 10
			// 2 + 8 = 10
			// 3 + 7 = 10
			// 4 + 6 = 10
			// 5 = 5
			result += value;
		}

		return result == 45;
	}

	isComplete(): boolean {
		return this.values.length == 9;
	}
}

class NilSeries extends Series {
	override isUnique(): boolean {
		return false;
	}

	override isValid(): boolean {
		return false;
	}

	override isComplete(): boolean {
		return false;
	}
}

const generateRandomPuzzle = (limit?: number): Puzzle => {
	const DEFAULT_LIMIT = 10;

	if (!limit) {
		limit = DEFAULT_LIMIT;
	}

	const result = new Puzzle();

	limit = limit || DEFAULT_LIMIT;
	for (let i = 0; i < limit; i += 1) {
		const newTile = random(1, 9);
		result.push(newTile);

		if (result.isFull() && result.isValid()) {
			return result;
		}
	}

	console.log(`Failed to create a puzzle: ${result.toString()}`);

	return new NilPuzzle();
};

const puzzle = generateRandomPuzzle(100000000);

console.log(puzzle.toString());

// for (let i = 0; i < 200; i += 1) {
// 	generateSimplePuzzle();
// }
