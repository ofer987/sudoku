import { range, matrix, shuffle, } from "../utils";
import { boardStringToGrid, boardGridToString, findEmptyHoleChar, convertBoard } from "../helpers";
describe("utils tests", () => {
    describe("range function", () => {
        it("should generate a range of numbers", () => {
            expect(range(3, i => i)).toEqual([0, 1, 2]);
        });
        it("should generate a range of doubled numbers", () => {
            expect(range(3, i => i * 2)).toEqual([0, 2, 4]);
        });
    });
    describe("matrix functions", () => {
        it("getRow should return correct value", () => {
            expect(matrix.getRow(10)).toEqual(1);
        });
        it("getCol should return correct value", () => {
            expect(matrix.getCol(10)).toEqual(1);
        });
        it("getZone should return correct value", () => {
            expect(matrix.getZone(1, 1)).toEqual(0);
            expect(matrix.getZone(2, 2)).toEqual(0);
        });
        it("getIndex should return correct value", () => {
            expect(matrix.getIndex(1, 1)).toEqual(10);
        });
        it("getZoneIndexs should return correct values", () => {
            expect(matrix.getZoneIndexs(0)).toEqual([0, 1, 2, 9, 10, 11, 18, 19, 20]);
        });
    });
    describe("shuffle function", () => {
        // Due to random nature of shuffle, this test checks the existence of all initial elements
        it("should shuffle the array", () => {
            const input = [1, 2, 3, 4];
            const result = shuffle(input);
            input.forEach(item => {
                expect(result).toContain(item);
            });
        });
    });
    describe("boardStringToGrid function", () => {
        it("should convert string to 2D grid", () => {
            expect(boardStringToGrid("123456789")).toEqual([["1", "2", "3", "4", "5", "6", "7", "8", "9"]]);
        });
    });
    describe("boardGridToString function", () => {
        it("should convert 2D grid to string", () => {
            const dummyGrid = [
                ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                ["2", "3", "4", "5", "6", "7", "8", "9", "1"],
                ["3", "4", "5", "6", "7", "8", "9", "1", "2"],
                ["4", "5", "6", "7", "8", "9", "1", "2", "3"],
                ["5", "6", "7", "8", "9", "1", "2", "3", "4"],
                ["6", "7", "8", "9", "1", "2", "3", "4", "5"],
                ["7", "8", "9", "1", "2", "3", "4", "5", "6"],
                ["8", "9", "1", "2", "3", "4", "5", "6", "7"],
                ["9", "1", "2", "3", "4", "5", "6", "7", "8"]
            ];
            const dummyGridString = dummyGrid.map(row => row.join("")).join("");
            expect(boardGridToString(dummyGrid)).toEqual(dummyGridString);
        });
    });
    describe("findEmptyHoleChar function", () => {
        it("should find the character that represents an empty hole", () => {
            expect(findEmptyHoleChar("1234567.9")).toEqual(".");
        });
        it("should throw error when length of emptyHoleChar is not 1", () => {
            const invalidInput = "1234567890";
            expect(() => findEmptyHoleChar(invalidInput)).toThrow(`Your input ${JSON.stringify(invalidInput)} is not a valid board`);
        });
    });
    describe("convertBoard function", () => {
        it("should convert board string to array", () => {
            expect(convertBoard("123", { as: "array" })).toEqual(["1", "2", "3"]);
        });
        it("should convert board string to 2D array", () => {
            expect(convertBoard("123456789", { as: "array2d" })).toEqual([["1", "2", "3", "4", "5", "6", "7", "8", "9"]]);
        });
        it("should convert 2D array to array", () => {
            expect(convertBoard([["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]], { as: "array" })).toEqual(["123", "456", "789"]);
        });
        it("should convert array to string", () => {
            expect(convertBoard(["1", "2", "3", "4", "5", "6", "7", "8", "9"], { as: "string" })).toEqual("123456789");
        });
        it("should convert array to 2D array", () => {
            console.log(convertBoard(["123", "456", "789"], { as: "array2d" }));
            expect(convertBoard(["123", "456", "789"], { as: "array2d" })).toEqual([["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]]);
        });
    });
});
