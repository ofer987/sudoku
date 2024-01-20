import { uniq, orderBy } from 'lodash';

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

	generate(): number[] {
		return [1, 2];
	}

	isValid(): boolean {
		return false;
	}
}

class Row {
	private tiles: number[] = [];

	push(value: number): void {
		if (value <= 0 || value > 9) {
			throw new RangeError(`${value} is not within 1 - 9`);
		}

		if (this.tiles.includes(value)) {
			throw new ExistingValueError(value);
		}

		this.tiles.push(value);
	}

	pop(): void {
		this.tiles.pop();
	}

	get(index: number): number {
		return this.tiles[index];
	}

	isValid(): boolean {
		let result = 0;

		for (const value of uniq(this.tiles)) {
			// 1 + 9 = 10
			// 2 + 8 = 10
			// 3 + 7 = 10
			// 4 + 6 = 10
			// 5 =5

			result += value;
		}

		return result == 45;
	}
}
