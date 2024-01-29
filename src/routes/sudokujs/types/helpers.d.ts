import type { AsTypes, BoardTypes } from "./common";
declare function convertBoard(board: BoardTypes, args?: {
    as?: AsTypes;
}): BoardTypes;
declare function boardStringToGrid(boardString: string): string[][];
declare function boardArrayToGrid(boardArray: string[]): string[][];
declare function boardGridToString(board: Array<Array<string | number>>): string;
declare function findEmptyHoleChar(board: BoardTypes): string;
declare const backtrackCalculate: (answer: Array<string | number>, rows: boolean[][], cols: boolean[][], zones: boolean[][], index: number, traceBackNums: number[], emptyHoleChar: string) => boolean;
declare const dsfOneSolutionCalculate: (answer: Array<string | number>, rows: boolean[][], cols: boolean[][], zones: boolean[][], index: number, traceBackNums: number[], mark: {
    finishes: number;
    answer?: (string | number)[] | undefined;
}, emptyHoleChar: string) => void;
/**
 * @param digHoleBoard dig hole board
 * @param digHoleCount dig hole count mean empty hole count for setting the difficulty
 * @author mucahidyazar
 */
declare const internalGenerate: (digHoleBoard: Array<string | number>, digHoleCount: number, emptyHoleChar: string) => (string | number)[];
export { backtrackCalculate, boardStringToGrid, boardArrayToGrid, boardGridToString, convertBoard, dsfOneSolutionCalculate, findEmptyHoleChar, internalGenerate };
//# sourceMappingURL=helpers.d.ts.map