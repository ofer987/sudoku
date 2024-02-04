import lodash from 'lodash';
const { toNumber } = lodash;
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
