import type { AsTypes, BoardTypes } from "./common";
/**
 * @param digHoleCount dig hole count mean empty hole count for setting the difficulty
 * @param jobCount generator job count , if generator fail , will try again with jobCount + 1
 * @author mucahidyazar
 */
export declare function generate(digHoleCount: number, jobCount?: number): Array<string | number>;
/**
 * @param digHoleCount dig hole count mean empty hole count for setting the difficulty
 * @param jobCount generator job count , if generator fail , will try again with jobCount + 1
 * @author mucahidyazar
 */
export declare function generateAsync(digHoleCount: number, jobCount?: number): Promise<Array<string | number>>;
/**
 * @param level 0 - 4
 * @author mucahidyazar
 */
export declare function generateByLevel(level?: number): Promise<(string | number)[]>;
/**
 * @param board board to solve
 * @param args strict: just one solution
 * @param args emptyHoleChar: empty hole char
 * @param args as: return type
 * @author mucahidyazar
 */
export declare function solve(board: BoardTypes, args: {
    strict?: boolean;
    emptyHoleChar: string;
    as?: AsTypes;
}): BoardTypes;
//# sourceMappingURL=methods.d.ts.map