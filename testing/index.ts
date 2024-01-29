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
		// let tileValue = this.tiles[index];
		for (let columnNumber = 0; columnNumber < 9; ) {
			// let rowNumber = 0;
			// let index = rowNumber * 9 + columnNumber;

			const squareNumber = random(0, 2);
			const randomRowPlacement = random(0, 2);

			const rowNumber = squareNumber * 3 + randomRowPlacement;
			const index = rowNumber * 9 + columnNumber;

			// index has already been filled
			if (this.tiles[index] > 0 && this.tiles[index] <= 9) {
				continue;
			}

			//
			// rowNumber += 1;
			// for (let columnNumber = 0; columnNumber < 9; columnNumber += 1) {
			// Maybe randomise it?
			// const squareNumber = random(0, 2)
			// const squareNumber = columnNumber % 3;

			// let rowNumber;
			// do {
			// TODO: Change to random from 0 to 2
			// const randomRowPlacement = random(0, 2);
			// rowNumber = squareNumber * 3 + randomRowPlacement;

			// while (this.isValid(rowNumber, columnNumber)) {
			// if (columnNumber - 3 > 0) {
			// 	// const rowNumber = squareNumber + randomRowPlacement;
			// 	const index = rowNumber * 9 + columnNumber;
			//
			// 	this.tiles[index] = value;
			// }

			// this.tiles[index] = value;
			if (this.isValid(value, rowNumber, columnNumber)) {
				this.tiles[index] = value;
				columnNumber += 1;
			}
		}
		// while (tileValue == value && this.isValid(rowNumber, columnNumber) {
	}

	// console.log(`Trying number ${value}`);
	// if (this.addTo == AddTo.Row) {
	// 	this.tiles.push(value);
	// }
	//
	// const rowNumber = floor((this.tiles.length - 1) / 9);
	// const columnNumber = (this.tiles.length - 1) % 9;
	//
	// console.log(`It has ${this.tiles.length} tiles`);
	// // console.log(`Row is number ${rowNumber}`);
	// // console.log(`Column is number ${columnNumber}`);
	//
	// // validate
	// if (!this.getRow(rowNumber).isUnique()) {
	// 	this.tiles.pop();
	//
	// 	return;
	// }
	//
	// console.log('Row is unique');
	//
	// if (!this.getColumn(columnNumber).isUnique()) {
	// 	for (let i = 0; i < columnNumber; i += 1) {
	// 		this.tiles.pop();
	// 	}
	//
	// 	return;
	// }

	// this.getRow(index);

	// console.log('Column is unique');

	// if (!this.getSquare(rowNumber, columnNumber).isUnique()) {
	// 	this.tiles.pop();
	//
	// 	return;
	// }

	// console.log('Square is unique');
	// }

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

	isValid(value: number, rowNumber: number, columnNumber: number): boolean {
		if (this.getRow(rowNumber).includes(value)) {
			return false;
		}

		if (this.getColumn(columnNumber).includes(value)) {
			return false;
		}

		if (this.getSquare(rowNumber, columnNumber).includes(value)) {
			return false;
		}

		return true;
	}

	isFull(): boolean {
		for (let index = 0; index < 81; index += 1) {
			if (this.tiles[index] <= 0 || this.tiles[index] > 9) {
				return false;
			}
		}

		return true;
	}

	isComplete(): boolean {
		for (let i = 0; i < 9; i += 1) {
			const row = this.getRow(i);
			if (!row.isValid()) {
				return false;
			}

			if (!row.isUnique()) {
				return false;
			}

			if (row.sum() != 45) {
				return false;
			}
		}

		for (let i = 0; i < 9; i += 1) {
			const column = this.getColumn(i);
			if (!column.isValid()) {
				return false;
			}

			if (!column.isUnique()) {
				return false;
			}

			if (column.sum() != 45) {
				return false;
			}
		}

		for (let i = 0; i < 9; i += 1) {
			for (let j = 0; j < 9; j += 1) {
				const square = this.getSquare(i, j);
				if (!square.isValid()) {
					return false;
				}

				if (!square.isUnique()) {
					return false;
				}

				if (square.sum() != 45) {
					return false;
				}
			}
		}

		return true;
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
	public values: number[] = [];

	constructor() {}

	includes(value: number): boolean {
		return this.values.includes(value);
	}

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

	sum(): number {
		let result = 0;

		for (let i = 0; i < 9; i += 1) {
			result += this.values[i];
		}

		return result;
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

const placeColumn = () => {};

const puzzle = generateRandomPuzzle(100000000);

console.log(puzzle.toString());

// for (let i = 0; i < 200; i += 1) {
// 	generateSimplePuzzle();
// }
