//conversion.test.js
import toFinite from "../src/toFinite.js";
import toInteger from "../src/toInteger.js";
import toNumber from "../src/toNumber.js";
import toString from "../src/toString.js";

describe("Conversion functions", () => {

    //toFinite
    describe("toFinite", () => {
        test("normal numbers", () => {
            expect(toFinite(3.2)).toBe(3.2);
        });

        test("Infinity handling", () => {
            expect(toFinite(Infinity)).toBe(1.7976931348623157e+308);
            expect(toFinite(-Infinity)).toBe(-1.7976931348623157e+308);
        });

        test("falsy values", () => {
            expect(toFinite(null)).toBe(0);
            expect(toFinite(undefined)).toBe(0);
            expect(toFinite(0)).toBe(0);
        });
    });

    //toInteger
    describe("toInteger", () => {
        test("floats to integer", () => {
            expect(toInteger(3.2)).toBe(3);
            expect(toInteger(3.9)).toBe(3);
        });

        test("already integer", () => {
            expect(toInteger(5)).toBe(5);
        });

        test("Infinity", () => {
            expect(toInteger(Infinity)).toBe(1.7976931348623157e+308);
        });
    });

    //toNumber
    describe("toNumber", () => {
        test("number input", () => {
            expect(toNumber(3.2)).toBe(3.2);
        });

        test("string input", () => {
            expect(toNumber("3.2")).toBe(3.2);
        });

        test("binary string", () => {
            expect(toNumber("0b101")).toBe(5);
        });

        test("octal string", () => {
            expect(toNumber("0o10")).toBe(8);
        });

        test("invalid hex", () => {
            expect(toNumber("-0x1")).toBeNaN();
        });

        test("symbol returns NaN", () => {
            expect(toNumber(Symbol())).toBeNaN();
        });

        test("object valueOf", () => {
            const obj = { valueOf: () => 42 };
            expect(toNumber(obj)).toBe(42);
        });
    });

    //toString
    describe("toString", () => {
        test("basic values", () => {
            expect(toString(123)).toBe("123");
            expect(toString(null)).toBe("null"); // HUOM: tämä voi olla bugi vs dokumentaatio
        });

        test("array conversion", () => {
            expect(toString([1, 2, 3])).toBe("1,2,3");
        });

        test("symbol conversion", () => {
            expect(toString(Symbol("a"))).toBe("Symbol(a)");
        });

        test("negative zero", () => {
            expect(toString(-0)).toBe("-0");
        });
    });

});