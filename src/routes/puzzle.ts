import lodash from 'lodash';
import { base64ToBytes, bytesToBase64 } from './utils';
import { Tile, OriginalTile, generateTileFromHash } from './tile';
const { toNumber } = lodash;

import sudokuJs from './sudokujs/index';

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

		const result = bytesToBase64(new TextEncoder().encode(raw));

		return result;
	}
}

const getNumericValue = (value: number | string): number | null => {
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
		const boardValue = getNumericValue(board[i]);
		const answerValue = getNumericValue(answer[i]);

		if (boardValue && answerValue && boardValue == answerValue) {
			tiles.push(new OriginalTile(i, boardValue, toNumber(puzzle.answer[i])));
		} else {
			tiles.push(new Tile(i, boardValue, toNumber(puzzle.answer[i])));
		}
	}

	return new Puzzle(tiles);
};

export const generatePuzzleFromBase64Hash = (hash: string): Puzzle => {
	const tiles = base64ToBytes(hash)
		.split('\n')
		.map((hash) => generateTileFromHash(hash));

	return new Puzzle(tiles);
};
