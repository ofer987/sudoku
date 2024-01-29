import type { SudokuJS } from './common';
import { generate, generateAsync, generateByLevel, solve } from './methods';
import Sudoku from './Sudoku';
export default function sudokuJs({ level, emptyHoleCount, strict }: SudokuJS): Promise<Sudoku>;
export { generate, generateAsync, generateByLevel, solve };
//# sourceMappingURL=index.d.ts.map