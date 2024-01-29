import { EMPTY_HOLE_CHAR } from './constants';
import {
	backtrackCalculate,
	convertBoard,
	dsfOneSolutionCalculate,
	internalGenerate
} from './helpers';
import { matrix, range, shuffle } from './utils';
const NUMS = range(9, (num) => num + 1);
// generator max job limit
const MAX_JOB_COUNT_LIMIT = 6;
/**
 * @param digHoleCount dig hole count mean empty hole count for setting the difficulty
 * @param jobCount generator job count , if generator fail , will try again with jobCount + 1
 * @author mucahidyazar
 */
export function generate(digHoleCount, jobCount = 1) {
	if (jobCount >= MAX_JOB_COUNT_LIMIT) {
		// internal generate do many times , reduce the difficulty
		jobCount = 1;
		digHoleCount -= 2;
	}
	// create center zone board to make simple board
	// let p = 0;
	// const shuffleNums = shuffle(range(9, (num) => num));
	// const simpleBoard = range(81, (index) => {
	//   if (matrix.getZone(index % 9, index / 9) === 4) {
	//     return shuffleNums[p++] + 1;
	//   }
	//   return EMPTY_HOLE_CHAR;
	// });
	const simpleBoard = '.'.repeat(81).split('');
	// solve the base board with normal sudoku
	const baseAnswer = solve(simpleBoard, { emptyHoleChar: EMPTY_HOLE_CHAR, as: 'array' });
	const board = internalGenerate(baseAnswer, digHoleCount, EMPTY_HOLE_CHAR);
	if (!board.length) {
		return generate(digHoleCount, jobCount + 1);
	}
	return board;
}
/**
 * @param digHoleCount dig hole count mean empty hole count for setting the difficulty
 * @param jobCount generator job count , if generator fail , will try again with jobCount + 1
 * @author mucahidyazar
 */
export async function generateAsync(digHoleCount, jobCount = 1) {
	return await new Promise((resolve, reject) => {
		try {
			const board = generate(digHoleCount, jobCount);
			if (board?.length) {
				resolve(board);
			} else {
				// If the board is not valid for some reason, you can handle the condition here
				reject(new Error('Failed to generate a valid board.'));
			}
		} catch (error) {
			reject(error);
		}
	});
}
/**
 * @param level 0 - 4
 * @author mucahidyazar
 */
export async function generateByLevel(level = 0) {
	// level to make dig hold count
	let digHoleCount = 40;
	switch (level) {
		case 0:
			digHoleCount = 40;
			break;
		case 1:
			digHoleCount = 45;
			break;
		case 2:
			digHoleCount = 50;
			break;
		case 3:
			digHoleCount = 54;
			break;
		case 4:
			digHoleCount = 58;
			break;
		default:
			throw new Error(`please input level [0 - 4]`);
	}
	return await generateAsync(digHoleCount, 1);
}
/**
 * @param board board to solve
 * @param args strict: just one solution
 * @param args emptyHoleChar: empty hole char
 * @param args as: return type
 * @author mucahidyazar
 */
export function solve(board, args) {
	const { strict = false, emptyHoleChar, as = 'array' } = args;
	const convertedBoard = convertBoard(board, { as: 'array' });
	let answer = [];
	const rows = range(9, () => range(10, () => false));
	const cols = range(9, () => range(10, () => false));
	const zones = range(9, () => range(10, () => false));
	let row, col, zone;
	convertedBoard.forEach((num, index) => {
		row = matrix.getRow(index);
		col = matrix.getCol(index);
		zone = matrix.getZone(index);
		if (String(num) !== emptyHoleChar) {
			rows[row][num] = true;
			cols[col][num] = true;
			zones[zone][num] = true;
		}
		answer.push(num);
	});
	let isSuccess = false;
	const traceBackNums = shuffle(NUMS);
	let firstCheckPoint = 0;
	for (let index = 0; index < 81; ++index) {
		if (String(answer[index]) === emptyHoleChar) {
			firstCheckPoint = index;
			break;
		}
	}
	if (strict) {
		const mark = {
			count: 0,
			finishes: 0,
			answer: []
		};
		dsfOneSolutionCalculate(
			answer,
			rows,
			cols,
			zones,
			firstCheckPoint,
			traceBackNums,
			mark,
			emptyHoleChar
		);
		if (mark.finishes > 1) {
			throw new Error('board is not one-solution sudoku');
		} else if (mark.finishes === 0) {
			isSuccess = false;
		} else {
			answer = mark.answer;
			isSuccess = true;
		}
	} else {
		isSuccess = backtrackCalculate(
			answer,
			rows,
			cols,
			zones,
			firstCheckPoint,
			traceBackNums,
			emptyHoleChar
		);
	}
	if (!isSuccess) {
		throw new Error('not found the solution. is that you give me the board with mistake?');
	}
	return convertBoard(answer, { as });
}
