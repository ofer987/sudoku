import Sudoku from "./Sudoku";
import { matrix, range, shuffle } from "./utils";
function convertBoard(board, args) {
    let convertedBoard = board;
    if (typeof board === 'string') {
        const { as = 'array' } = args ?? {};
        if (as === "array") {
            convertedBoard = board.split('');
        }
        else if (as === "array2d") {
            convertedBoard = boardStringToGrid(board);
        }
    }
    else if (Array.isArray(board[0])) {
        const { as = 'string' } = args ?? {};
        if (as === "string") {
            convertedBoard = boardGridToString(board);
        }
        else if (as === "array") {
            convertedBoard = board.map((row) => row.join(''));
        }
    }
    else if (Array.isArray(board)) {
        const { as = 'string' } = args ?? {};
        if (as === "string") {
            convertedBoard = board.join('');
        }
        else if (as === "array2d") {
            convertedBoard = boardArrayToGrid(board);
        }
    }
    return convertedBoard;
}
function boardStringToGrid(boardString) {
    /* Convert a board string to a two-dimensional array
     */
    const rows = [];
    let curRow = [];
    for (let i = 0; i < boardString.length; ++i) {
        curRow.push(boardString[i]);
        if (Number(i) % 9 === 8) {
            rows.push(curRow);
            curRow = [];
        }
    }
    return rows;
}
function boardArrayToGrid(boardArray) {
    /* Convert a board array to a two-dimensional array
     */
    // example
    // boardArray === ["123", "456", "789"]
    // should be === [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]]
    const rows = [];
    boardArray.forEach((row, index) => {
        const curRow = [];
        for (let i = 0; i < row.length; ++i) {
            curRow.push(row[i]);
        }
        rows.push(curRow);
    });
    return rows;
}
function boardGridToString(board) {
    /* Convert a board grid to a string
     */
    let boardString = '';
    for (let r = 0; r < 9; ++r) {
        for (let c = 0; c < 9; ++c) {
            boardString += board[r][c];
        }
    }
    return boardString;
}
function findEmptyHoleChar(board) {
    if (board.length > 9) {
        throw new Error(`Your input ${JSON.stringify(board)} is not a valid board`);
    }
    const boardArray = convertBoard(board, { as: "array" });
    const emptyHoles = {};
    boardArray.forEach((item) => {
        const isStringAndZero = typeof item === 'string' && Number(item) === 0;
        const isStringAndNotANumber = typeof item === 'string' && Number.isNaN(Number(item));
        if (isStringAndZero || isStringAndNotANumber) {
            emptyHoles[item] = emptyHoles[item] ? emptyHoles[item] + 1 : 1;
        }
    });
    const emptyHolesKeys = Object.entries(emptyHoles);
    const emptyHoleChar = emptyHolesKeys?.[0]?.[0];
    if (emptyHoleChar?.length !== 1) {
        throw new Error("emptyHoleChar should be 1 char");
    }
    return emptyHoleChar;
}
const backtrackCalculate = (answer, rows, cols, zones, index, traceBackNums, emptyHoleChar) => {
    const row = matrix.getRow(index);
    const col = matrix.getCol(index);
    const zone = matrix.getZone(index);
    if (index >= 81) {
        return true;
    }
    if (answer[index] !== emptyHoleChar) {
        return backtrackCalculate(answer, rows, cols, zones, index + 1, traceBackNums, emptyHoleChar);
    }
    let num;
    // eslint-disable-next-line @typescript-eslint/no-for-in-array
    for (const n in traceBackNums) {
        num = traceBackNums[n];
        if (!rows[row][num] && !cols[col][num] && !zones[zone][num]) {
            answer[index] = num;
            rows[row][num] = true;
            cols[col][num] = true;
            zones[zone][num] = true;
            if (backtrackCalculate(answer, rows, cols, zones, index + 1, traceBackNums, emptyHoleChar)) {
                return true;
            }
            else {
                answer[index] = emptyHoleChar;
                rows[row][num] = false;
                cols[col][num] = false;
                zones[zone][num] = false;
            }
        }
    }
    return false;
};
const dsfOneSolutionCalculate = (answer, rows, cols, zones, index, traceBackNums, mark, emptyHoleChar) => {
    if (mark.finishes > 1) {
        return;
    }
    if (index >= 81) {
        for (let i = 0; i < answer.length; ++i) {
            if (String(answer[i]) === emptyHoleChar) {
                return;
            }
        }
        mark.finishes++;
        mark.answer = answer;
        return;
    }
    const row = matrix.getRow(index);
    const col = matrix.getCol(index);
    const zone = matrix.getZone(index);
    if (String(answer[index]) !== emptyHoleChar) {
        dsfOneSolutionCalculate(answer, rows, cols, zones, index + 1, traceBackNums, mark, emptyHoleChar);
        return;
    }
    traceBackNums.forEach(num => {
        if (!rows[row][num] && !cols[col][num] && !zones[zone][num]) {
            answer[index] = num;
            rows[row][num] = true;
            cols[col][num] = true;
            zones[zone][num] = true;
            dsfOneSolutionCalculate([...answer], [...rows], [...cols], [...zones], index + 1, traceBackNums, mark, emptyHoleChar);
            answer[index] = emptyHoleChar;
            rows[row][num] = false;
            cols[col][num] = false;
            zones[zone][num] = false;
        }
    });
};
/**
 * @param digHoleBoard dig hole board
 * @param digHoleCount dig hole count mean empty hole count for setting the difficulty
 * @author mucahidyazar
 */
const internalGenerate = (digHoleBoard, digHoleCount, emptyHoleChar) => {
    // random candidate indexes each try dig hole operation
    const fixedPositions = range(9, (num) => matrix.getZoneIndexs(num)[Math.random() * 9]).sort((a, b) => a - b);
    const arr = [];
    digHoleBoard.forEach((_, index) => {
        if (fixedPositions.length > 0 && fixedPositions[0] === index) {
            fixedPositions.splice(0, 1);
            return;
        }
        arr.push(index);
    });
    const candidateHoles = shuffle(arr);
    // each dig hole operation will use strict sudoku to solve make sure is one solution
    // cycle done when dig hole enough , one solution sudoku is generated
    let digHoleFulfill = 0;
    candidateHoles.forEach(position => {
        if (digHoleFulfill >= digHoleCount) {
            return;
        }
        if (String(digHoleBoard[position]) !== emptyHoleChar) {
            const old = digHoleBoard[position];
            digHoleBoard[position] = emptyHoleChar;
            // use sudoku solver to solve with strict , that will make sure one solution
            try {
                digHoleFulfill++;
                // eslint-disable-next-line no-new
                new Sudoku(digHoleBoard, true, emptyHoleChar);
            }
            catch {
                digHoleBoard[position] = old;
                digHoleFulfill--;
            }
        }
    });
    if (digHoleFulfill === digHoleCount) {
        return digHoleBoard;
    }
    return [];
};
export { backtrackCalculate, boardStringToGrid, boardArrayToGrid, boardGridToString, convertBoard, dsfOneSolutionCalculate, findEmptyHoleChar, internalGenerate };
