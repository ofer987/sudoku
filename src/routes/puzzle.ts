import lodash from 'lodash';
const { toNumber } = lodash;
import sudokuJs from './sudokujs/index';

export class Tile {
	private index: number;
	public current: number | null;
	public correct: number;

	constructor(index: number, currentValue: number | null, correctValue: number) {
		this.index = index;
		this.current = currentValue;
		this.correct = correctValue;
	}

	get isCorrect(): boolean {
		return this.current != null && this.current == this.correct;
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

	get answer(): number[] {
		return this.board.map((tile) => tile.correct);
	}
}

export const generateSudokuPuzzle = async (): Promise<Puzzle> => {
	const puzzle = await sudokuJs(1);

	const tiles: Tile[] = [];
	const board = puzzle.getBoard('array');
	for (let i = 0; i < 81; i += 1) {
		const boardValue = board[i];
		let value: number | null = null;
		if (typeof boardValue == 'number' || typeof boardValue == 'string') {
			value = toNumber(boardValue);
		}
		if (value == null || value <= 0 || value > 9) {
			value = null;
		}
		tiles.push(new Tile(i, value, toNumber(puzzle.answer[i])));
	}

	return new Puzzle(tiles);
};
