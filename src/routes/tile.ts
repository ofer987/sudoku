import lodash from 'lodash';
const { toNumber, padStart } = lodash;

export class Tile {
	private indexValue: number;
	private currentValue: number | null;
	private correct: number;

	constructor(index: number, currentValue: number | null, correctValue: number) {
		this.indexValue = index;
		this.currentValue = currentValue;
		this.correct = correctValue;
	}

	get index(): number {
		return this.indexValue;
	}

	get current(): number | null {
		return this.currentValue;
	}

	set current(value: number | null) {
		if (value && (value < 1 || value > 9)) {
			return;
		}

		this.currentValue = value;
	}

	get isAnswered(): boolean {
		return false;
	}

	get isCorrect(): boolean {
		return this.currentValue != null && this.currentValue == this.correct;
	}

	get toHash(): string {
		let isAnsweredString = 'F';
		if (this.isAnswered) {
			isAnsweredString = 'T';
		}

		if (this.currentValue?.toString() == 'NaN') {
			return `${isAnsweredString},${padStart(this.index.toString(), 2, '0')},0,${this.correct}`;
		}

		return `${isAnsweredString},${padStart(this.index.toString(), 2, '0')},${this.currentValue},${this.correct}`;
	}
}

export class AnsweredTile extends Tile {
	public get isAnswered(): boolean {
		return true;
	}

	get isCorrect(): boolean {
		return true;
	}
}

export const generateTileFromHash = (hash: string): Tile => {
	// console.log(hash);

	const parameters = hash.split(',');

	const isAnswered = parameters[0];
	const index = toNumber(parameters[1]);
	const thirdQuestion = toNumber(parameters[2]);

	let currentValue: number | null;
	if (thirdQuestion == 0) {
		currentValue = null;
	} else {
		currentValue = thirdQuestion;
	}

	const correctValue = toNumber(parameters[3]);

	if (isAnswered == 'T') {
		return new AnsweredTile(index, currentValue, correctValue);
	}
	return new Tile(index, currentValue, correctValue);
};
