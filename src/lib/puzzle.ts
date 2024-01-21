import { uniq, orderBy, floor } from 'lodash';

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
	tiles = [];
	rows = [];
	columns = [];
	squares = [];

	Puzzle() {}

	getRow(value: number): Series {
		if (value < 0 || value >= 9) {
			return new NilSeries([]);
		}

		const result: number[] = [9];

		const start = value * 9;
		const end = (value + 1) * 9;
		for (let i = start; i < end; i += 1) {
			result.push(this.tiles[i] || 0);
		}

		return new Series(result);
	}

	getColumn(value: number): Series {
		if (value < 0 || value >= 9) {
			return new NilSeries([]);
		}

		const result: number[] = [9];

		const start = value - 1;
		const end = 72 + value - 1;
		for (let i = start; i < end; i += 9) {
			result.push(this.tiles[i] || 0);
		}

		return new Series(result);
	}

	getSquare(row: number, column: number): Series {
		if (row < 0 || row >= 9 || column < 0 || column >= 9) {
			return new NilSeries([]);
		}

		const result: number[] = [9];

		const startRow = floor(row / 3) * 3;
		const startColumn = floor(column / 3) * 3;
		for (let i = startRow; i < startRow + 3; i += 3) {
			for (let j = startColumn; j < startColumn + 3; j += 3) {
				const index = i * 9 + j;
				result.push(this.tiles[index] || 0);
			}
		}

		return new Series(result);
	}

	generate(): number[] {
		return [1, 2];
	}

	isValid(): boolean {
		return false;
	}
}

class Series {
	private values: number[] = [];

	constructor(values: number[]) {
		this.values = values;
	}

	push(value: number): void {
		if (value <= 0 || value > 9) {
			throw new RangeError(`${value} is not within 1 - 9`);
		}

		if (this.values.includes(value)) {
			throw new ExistingValueError(value);
		}

		this.values.push(value);
	}

	// pop(): void {
	// 	this.values.pop();
	// }

	get(index: number): number {
		return this.values[index];
	}

	isValid(): boolean {
		let result = 0;

		for (const value of uniq(this.values)) {
			// 1 + 9 = 10
			// 2 + 8 = 10
			// 3 + 7 = 10
			// 4 + 6 = 10
			// 5 =5

			result += value;
		}

		return result == 45;
	}

	isComplete(): boolean {
		return this.values.length == 9;
	}
}

class NilSeries extends Series {
	isValid(): boolean {
		return false;
	}

	isComplete(): boolean {
		return false;
	}
}
