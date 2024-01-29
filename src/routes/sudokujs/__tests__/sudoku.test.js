import sudokuJs from '../index';
import { solve } from '../methods';
describe('Sudoku Solver Functionality', () => {
    it('should be able to solve a given Sudoku board', async () => {
        const sudoku = await sudokuJs({ level: 4 });
        // get sudoku puzzle
        const board = sudoku.getBoard("array");
        // get sudoku solution
        const answer = sudoku.getAnswer("string");
        const solution = solve(board, { emptyHoleChar: '.', as: "string" });
        // Verify that the returned solution is not null.
        expect(solution).not.toBeNull();
        expect(answer).not.toBeNull();
        // Additionally, you can also validate that the solution is a proper Sudoku board (9x9 matrix)
        expect(solution?.length).toBe(81);
        expect(answer?.length).toBe(81);
        expect(solution).toEqual(answer);
    });
    // it('should produce a valid solution', () => {
    //   const sudokuJsClient = sudokuJs();
    //   const solution = sudokuJsClient.solve(sampleBoard);
    //   // Run a function to validate the Sudoku board. This function would check all rows, columns, and squares to ensure they contain all numbers from 1 to 9 exactly once.
    //   const isValid = sudokuJsClient.validate(solution);
    //   // Verify that the solution is valid
    //   expect(isValid).toBe(true);
    // });
    // it('should produce a unique solution for a given Sudoku board', () => {
    //   const sudokuJsClient = sudokuJs()
    //   const solution1 = sudokuJsClient.solve(sampleBoard)
    //   const solution2 = sudokuJsClient.solve(sampleBoard)
    //   // Compare the two solutions. If the Sudoku solver is deterministic, these should be the same.
    //   expect(solution1).toEqual(solution2)
    // })
});
// describe('Sudoku Board Generation Functionality', () => {
//   it('should generate a valid Sudoku board', () => {
//     const sudokuJsClient = sudokuJs()
//     const { board } = sudokuJsClient.generate(20)
//     // Verify that the generated board is not null.
//     expect(board).not.toBeNull()
//     // Additionally, you can also validate that the generated board is a proper Sudoku board (9x9 matrix)
//     expect(board?.length).toBe(9)
//     board?.forEach(row => {
//       expect(row.length).toBe(9)
//     })
//     // Run a function to validate the Sudoku board. This function would check all rows, columns, and squares to ensure they contain all numbers from 1 to 9 exactly once.
//     const isValid = sudokuJsClient.validate(board)
//     // Verify that the board is valid
//     expect(isValid).toBe(true)
//   })
//   it('should generate different Sudoku boards each time', () => {
//     const sudokuJsClient = sudokuJs()
//     const board1 = sudokuJsClient.generate(20)
//     const board2 = sudokuJsClient.generate(20)
//     // If the Sudoku board generation is random, these should not be the same.
//     expect(board1).not.toEqual(board2)
//   })
//   it('should generate generate 50 holes in the Sudoku board', () => {
//     const sudokuJsClient = sudokuJs()
//     console.time('generate')
//     // const board1 = sudokuJsClient.generate(20) 22ms
//     // const board1 = sudokuJsClient.generate(24) 602ms
//     // const board1 = sudokuJsClient.generate(28) 4662ms
//     const board1 = sudokuJsClient.generate(70, { hasMultipleSolution: true })
//     console.timeEnd('generate')
//     // const board2 = sudokuJsClient.generate(20)
//     // If the Sudoku board generation is random, these should not be the same.
//     // expect(board1).not.toEqual(board2)
//   })
//   it('should generate a solvable Sudoku board', () => {
//     const sudokuJsClient = sudokuJs()
//     const board = sudokuJsClient.generate(20)
//     // Solve the generated Sudoku board
//     const solution = sudokuJsClient.solve(board.board) as number[][]
//     // Verify that a solution exists
//     expect(solution).not.toBeNull()
//     // Check if the solution is valid
//     const isValid = sudokuJsClient.validate(solution)
//     // Verify that the solution is valid
//     expect(isValid).toBe(true)
//   })
// })
