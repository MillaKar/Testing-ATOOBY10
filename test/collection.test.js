//collection.test.js
import keys from "../src/keys.js";
import map from "../src/map.js";
import memoize from "../src/memoize.js";
import reduce from "../src/reduce.js";
import slice from "../src/slice.js";

describe("Collection & Object functions", () => {

    // keys
    describe("keys", () => {
        test("object keys", () => {
            const obj = { a: 1, b: 2 };
            expect(keys(obj)).toEqual(["a", "b"]);
        });

        test("array-like (string)", () => {
            expect(keys("hi")).toEqual(["0", "1"]);
        });
    });

    // map
    describe("map", () => {
        test("basic mapping", () => {
            const result = map([1, 2, 3], (n) => n * 2);
            expect(result).toEqual([2, 4, 6]);
        });

        test("empty array", () => {
            expect(map([], (n) => n)).toEqual([]);
        });

        test("null array", () => {
            expect(map(null, (n) => n)).toEqual([]);
        });
    });

    // memoize
    describe("memoize", () => {
        test("caches result", () => {
            let count = 0;
            const fn = memoize((x) => {
                count++;
                return x * 2;
            });

            expect(fn(2)).toBe(4);
            expect(fn(2)).toBe(4);
            expect(count).toBe(1); // should only run once
        });

        test("resolver function", () => {
            const fn = memoize(
                (a, b) => a + b,
                (a, b) => `${a}-${b}`
            );

            expect(fn(1, 2)).toBe(3);
            expect(fn(1, 2)).toBe(3); // cached
        });

        test("throws if func not function", () => {
            expect(() => memoize(123)).toThrow(TypeError);
        });
    });

    // reduce
    describe("reduce", () => {
        test("array sum", () => {
            const result = reduce([1, 2, 3], (sum, n) => sum + n, 0);
            expect(result).toBe(6);
        });

        test("object reduce", () => {
            const obj = { a: 1, b: 2 };
            const result = reduce(obj, (sum, val) => sum + val, 0);
            expect(result).toBe(3);
        });
    });

    // slice
    describe("slice", () => {
        test("basic slice", () => {
            expect(slice([1, 2, 3, 4], 1, 3)).toEqual([2, 3]);
        });

        test("negative start", () => {
            expect(slice([1, 2, 3, 4], -2)).toEqual([3, 4]);
        });

        test("negative end", () => {
            expect(slice([1, 2, 3, 4], 0, -1)).toEqual([1, 2, 3]);
        });

        test("empty array", () => {
            expect(slice([], 0, 2)).toEqual([]);
        });
    });

});