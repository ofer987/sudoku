import { generate, generateAsync, generateByLevel, solve } from './methods';

import Sudoku from './Sudoku';

type levels = 1 | 2 | 3 | 4;

export default async function sudokuJs(level: levels, strict: boolean = true) {
	const board = await generateByLevel(level);
	const sudoku = new Sudoku(board, strict);
	return sudoku;
}

export { generate, generateAsync, generateByLevel, solve };
