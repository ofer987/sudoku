type AsTypes = "string" | "array" | "array2d";
type BoardTypes = string | Array<string | number> | Array<Array<string | number>>;
type NumericRange<START extends number, END extends number, ARR extends unknown[] = [], ACC extends number = never> = ARR['length'] extends END ? ACC | START | END : NumericRange<START, END, [...ARR, 1], ARR[START] extends undefined ? ACC : ACC | ARR['length']>;
type SudokuJS1 = {
    level: NumericRange<1, 4>;
    emptyHoleCount?: NumericRange<0, 64>;
};
type SudokuJS2 = {
    level?: NumericRange<1, 4>;
    emptyHoleCount: NumericRange<0, 64>;
};
type SudokuJS = (SudokuJS1 | SudokuJS2) & {
    emptyHoleChar?: string;
    strict?: boolean;
};
type GetBoard = {
    as?: AsTypes;
};
export type { AsTypes, BoardTypes, GetBoard, SudokuJS };
//# sourceMappingURL=common.d.ts.map