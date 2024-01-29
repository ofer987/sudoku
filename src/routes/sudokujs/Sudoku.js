import { EMPTY_HOLE_CHAR } from "./constants";
import { convertBoard } from "./helpers";
import { solve } from "./methods";
import { formatPrint } from "./utils";
export default class Sudoku {
    board;
    answer;
    timecount;
    emptyHoleChar;
    constructor(board, strict = false, emptyHoleChar = EMPTY_HOLE_CHAR) {
        this.board = board;
        this.emptyHoleChar = emptyHoleChar;
        if (!board || board.length !== 81) {
            throw new Error("is not a 9 * 9 matrix sudoku board");
        }
        const timeBegin = new Date().getTime();
        this.answer = solve(this.board, { strict, emptyHoleChar });
        this.timecount = new Date().getTime() - timeBegin;
    }
    getBoard(as) {
        return convertBoard(this.board, { as });
    }
    getAnswer(as) {
        return convertBoard(this.answer, { as });
    }
    getEmptyHoleChar() {
        return this.emptyHoleChar;
    }
    debug() {
        formatPrint(this.getBoard("array"));
        formatPrint(this.getAnswer("array"));
        const boardString = this.getBoard("string");
    }
}
