// test/lang.test.js
import isArguments from "../src/isArguments.js";
import isArrayLike from "../src/isArrayLike.js";
import isArrayLikeObject from "../src/isArrayLikeObject.js";
import isBoolean from "../src/isBoolean.js";
import isBuffer from "../src/isBuffer.js";
import isDate from "../src/isDate.js";
import isEmpty from "../src/isEmpty.js";
import isLength from "../src/isLength.js";
import isObject from "../src/isObject.js";
import isObjectLike from "../src/isObjectLike.js";
import isSymbol from "../src/isSymbol.js";
import isTypedArray from "../src/isTypedArray.js";

describe("Lang type-check functions", () => {

    // -----------------------
    // isArguments
    // -----------------------
    describe("isArguments", () => {
        test("detects arguments object", () => {
            function testFn() { return isArguments(arguments); }
            expect(testFn(1, 2, 3)).toBe(true);
        });
        test("non-arguments returns false", () => {
            expect(isArguments([1, 2, 3])).toBe(false);
        });
    });

    // -----------------------
    // isArrayLike
    // -----------------------
    describe("isArrayLike", () => {
        test("array-like values", () => {
            expect(isArrayLike([1, 2, 3])).toBe(true);
            expect(isArrayLike("abc")).toBe(true);
            expect(isArrayLike({ length: 2 })).toBe(true);
            expect(isArrayLike(function () { })).toBe(false);
        });
    });

    // -----------------------
    // isArrayLikeObject
    // -----------------------
    describe("isArrayLikeObject", () => {
        test("array-like objects", () => {
            expect(isArrayLikeObject([1, 2, 3])).toBe(true);
            expect(isArrayLikeObject({ length: 2 })).toBe(true);
            expect(isArrayLikeObject("abc")).toBe(false);
        });
    });

    // -----------------------
    // isBoolean
    // -----------------------
    describe("isBoolean", () => {
        test("boolean primitives and objects", () => {
            expect(isBoolean(true)).toBe(true);
            expect(isBoolean(false)).toBe(true);
            expect(isBoolean(new Boolean(true))).toBe(true);
            expect(isBoolean(0)).toBe(false);
        });
    });

    // -----------------------
    // isBuffer
    // -----------------------
    describe("isBuffer", () => {
        test("buffers", () => {
            const buf = typeof Buffer !== 'undefined' ? Buffer.from([1, 2]) : null;
            if (buf) expect(isBuffer(buf)).toBe(true);
            expect(isBuffer(new Uint8Array([1, 2]))).toBe(false);
        });
    });

    // -----------------------
    // isDate
    // -----------------------
    describe("isDate", () => {
        test("date objects", () => {
            expect(isDate(new Date())).toBe(true);
            expect(isDate(Date())).toBe(false); // string, not date object
        });
        test("real Date objects (covers line 25)", () => {
            const d = new Date();
            expect(isDate(d)).toBe(true);         // normaalitapauksessa nodeIsDate
            expect(isDate({})).toBe(false);       // pakottaa rivin 25 else-haaran käyttöön
            expect(isDate("2023-01-01")).toBe(false); // string, ei Date-objekti
        });
    });

    // -----------------------
    // isEmpty
    // -----------------------
    describe("isEmpty", () => {
        test("empty values", () => {
            expect(isEmpty(null)).toBe(true);
            expect(isEmpty([])).toBe(true);
            expect(isEmpty({})).toBe(true);
            expect(isEmpty([1])).toBe(false);
            expect(isEmpty({ a: 1 })).toBe(false);
        });
    });

    // -----------------------
    // isLength
    // -----------------------
    describe("isLength", () => {
        test("valid lengths", () => {
            expect(isLength(0)).toBe(true);
            expect(isLength(3)).toBe(true);
            expect(isLength(-1)).toBe(false);
            expect(isLength(Infinity)).toBe(false);
            expect(isLength("3")).toBe(false);
        });
    });

    // -----------------------
    // isObject
    // -----------------------
    describe("isObject", () => {
        test("objects and functions", () => {
            expect(isObject({})).toBe(true);
            expect(isObject([])).toBe(true);
            expect(isObject(() => { })).toBe(true);
            expect(isObject(null)).toBe(false);
        });
    });

    // -----------------------
    // isObjectLike
    // -----------------------
    describe("isObjectLike", () => {
        test("object-like values", () => {
            expect(isObjectLike({})).toBe(true);
            expect(isObjectLike([])).toBe(true);
            expect(isObjectLike(null)).toBe(false);
            expect(isObjectLike(() => { })).toBe(false);
        });
    });

    // -----------------------
    // isSymbol
    // -----------------------
    describe("isSymbol", () => {
        test("symbol values", () => {
            expect(isSymbol(Symbol())).toBe(true);
            expect(isSymbol("abc")).toBe(false);
        });
        test("symbol values (covers line 20)", () => {
            expect(isSymbol(Symbol())).toBe(true);          // tyyppi 'symbol', rivi 20 suoritetaan
            expect(isSymbol(Object(Symbol()))).toBe(true);  // pakottaa else-haaran
            expect(isSymbol("abc")).toBe(false);            // ei symbol
        });
    });

    // -----------------------
    // isTypedArray
    // -----------------------
    describe("isTypedArray", () => {
        test("typed arrays", () => {
            expect(isTypedArray(new Uint8Array(2))).toBe(true);
            expect(isTypedArray([])).toBe(false);
        });
        test("typed arrays (covers line 28)", () => {
            expect(isTypedArray(new Uint8Array())).toBe(true); // testaa reTypedTag regexin
            expect(isTypedArray(new Int32Array())).toBe(true); // eri tyyppi
            expect(isTypedArray([])).toBe(false);              // pakottaa else-haaran riville 28
            expect(isTypedArray({})).toBe(false);
        });
    });

});