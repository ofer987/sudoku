function range(max, cb) {
    return [...Array(max).keys()].map((num) => cb(num));
}
const matrix = {
    getRow: (index) => {
        return index % 9;
    },
    getCol: (index) => {
        return parseInt(String(index / 9));
    },
    getZone: (row, col) => {
        let index;
        if (!col) {
            index = row;
        }
        else {
            index = col * 9 + row;
        }
        row = matrix.getRow(index);
        col = matrix.getCol(index);
        const x = parseInt(String(col / 3));
        const y = parseInt(String(row / 3));
        return y * 3 + x;
    },
    getIndex: (row, col) => {
        return col * 9 + row;
    },
    getZoneIndexs: (zone = 0) => {
        const rows = [0, 1, 2];
        const cols = [0, 1, 2];
        const indexs = [];
        cols.forEach((col) => {
            rows.forEach((row) => {
                indexs.push(((col + parseInt(String(zone / 3)) * 3) * 9) + (row + (zone % 3) * 3));
            });
        });
        return indexs;
    }
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
function shuffle(array) {
    const length = array == null ? 0 : array.length;
    if (!length) {
        return [];
    }
    let index = -1;
    const lastIndex = length - 1;
    const result = copyArray(array);
    while (++index < length) {
        const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
        const value = result[rand];
        result[rand] = result[index];
        result[index] = value;
    }
    return result;
}
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
    let index = -1;
    const length = source.length;
    if (!array?.length) {
        array = new Array(length);
    }
    while (++index < length) {
        array[index] = source[index];
    }
    return array;
}
function formatPrint(arr) {
    const matrix = [];
    let rows = [];
    arr.forEach((num, index) => {
        if (index % 9 === 0) {
            rows = [];
        }
        rows.push(num);
        if (rows.length === 9) {
            matrix.push(rows);
        }
    });
}
export { range, matrix, shuffle, formatPrint, };
