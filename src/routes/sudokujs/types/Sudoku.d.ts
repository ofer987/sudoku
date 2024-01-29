import type { BoardTypes } from "./common";
export default class Sudoku {
    board: BoardTypes;
    answer: BoardTypes;
    timecount: number;
    emptyHoleChar: string;
    constructor(board: BoardTypes, strict?: boolean, emptyHoleChar?: string);
    getBoard(as: "string"): string;
    getBoard(as: "array"): Array<string | number>;
    getBoard(as: "array2d"): Array<Array<string | number>>;
    getAnswer(as: "string"): string;
    getAnswer(as: "array"): Array<string | number>;
    getAnswer(as: "array2d"): Array<Array<string | number>>;
    getEmptyHoleChar(): string;
    debug(): void;
}
//# sourceMappingURL=Sudoku.d.ts.map