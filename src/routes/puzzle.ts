import lodash from 'lodash';
const { toNumber, padStart } = lodash;

import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

import sudokuJs from './sudokujs/index';

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
		this.currentValue = value;
	}

	get isOriginal(): boolean {
		return false;
	}

	get isCorrect(): boolean {
		return this.currentValue != null && this.currentValue == this.correct;
	}

	get toHash(): string {
		if (this.currentValue?.toString() == 'NaN') {
			return `${padStart(this.index.toString(), 2, '0')}0${this.correct}`;
		}

		return `${padStart(this.index.toString(), 2, '0')}${this.currentValue}${this.correct}`;
	}
}

export class OriginalTile extends Tile {
	public get isOriginal(): boolean {
		return true;
	}

	get isCorrect(): boolean {
		return true;
	}
}

export class Puzzle {
	public board: Tile[];

	constructor(board: Tile[]) {
		this.board = board;
	}

	get isCorrect(): boolean {
		for (const tile of this.board) {
			if (!tile.isCorrect) {
				return false;
			}
		}

		return true;
	}

	get toHash(): string {
		const raw = this.board.map((tile) => tile.toHash).join('\n');
		//
		// const result = atob(raw);

		const result = this.bytesToBase64(new TextEncoder().encode(raw));
		console.log(`Encoded string: [${result}]`);

		return result;
	}

	base64ToBytes(base64: string): Uint8Array {
		const binString = atob(base64);

		return Uint8Array.from(binString, (m) => m.codePointAt(0) || 0);
	}

	// From https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem.
	bytesToBase64(bytes: Uint8Array): string {
		const binString = String.fromCodePoint(...bytes);

		return btoa(binString);
	}
}

const getNumerValue = (value: number | string): number | null => {
	if (value == null || value <= 0 || value > 9) {
		return null;
	}

	if (typeof value == 'number' || typeof value == 'string') {
		return toNumber(value);
	}

	return null;
};

export const generateSudokuPuzzle = async (): Promise<Puzzle> => {
	const puzzle = await sudokuJs(1);

	const tiles: Tile[] = [];
	const board = puzzle.getBoard('array');
	const answer = puzzle.getAnswer('array');
	for (let i = 0; i < 81; i += 1) {
		const boardValue = getNumerValue(board[i]);
		const answerValue = getNumerValue(answer[i]);

		if (boardValue && answerValue && boardValue == answerValue) {
			tiles.push(new OriginalTile(i, boardValue, toNumber(puzzle.answer[i])));
		} else {
			tiles.push(new Tile(i, boardValue, toNumber(puzzle.answer[i])));
		}
	}

	return new Puzzle(tiles);
};
