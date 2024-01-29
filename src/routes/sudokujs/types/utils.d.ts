declare function range<T = number>(max: number, cb: (i: number) => T): T[];
declare const matrix: {
    getRow: (index: number) => number;
    getCol: (index: number) => number;
    getZone: (row: number, col?: number) => number;
    getIndex: (row: number, col: number) => number;
    getZoneIndexs: (zone?: number) => number[];
};
/**
 * Creates an array of shuffled values, using a version of the
 * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to shuffle.
 * @returns {Array} Returns the new shuffled array.
 * @example
 *
 * shuffle([1, 2, 3, 4])
 * // => [4, 1, 3, 2]
 */
declare function shuffle(array: number[]): number[];
declare function formatPrint(arr: Array<string | number>): void;
export { range, matrix, shuffle, formatPrint, };
//# sourceMappingURL=utils.d.ts.map