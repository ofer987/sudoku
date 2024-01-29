import sudokuJs from './sudokujs/index';

interface Puzzle {
	board: number[];
	answer: number[];
}

const generateSudokuPuzzle = async (): Promise<Puzzle> => {
	// const puzzle = async (): Promise<number[]> => {
	// 	return getPuzzleData();
	// 	return [toInteger(1), 2, 3];
	// };

	return sudokuJs(1);

	// const board: number[] = [];
	// for (const value of puzzle.getBoard('array')) {
	// 	board.push(toInteger(value));
	// }
	//
	// const answer: number[] = [];
	// for (const value of puzzle.getAnswer('array')) {
	// 	answer.push(toInteger(value));
	// }
};

export { generateSudokuPuzzle };
