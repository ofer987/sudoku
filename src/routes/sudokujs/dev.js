import sudokuJs from './index';
async function runAsync() {
    const sudoku = await sudokuJs({ level: 4 });
    // get sudoku puzzle
    sudoku.getBoard("array");
    // get sudoku solution
    sudoku.getAnswer("array");
    // show debug infomation
    sudoku.debug();
}
void runAsync();
