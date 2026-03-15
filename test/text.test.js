// test/text.test.js
import camelCase from "../src/camelCase.js";
import capitalize from "../src/capitalize.js";
import endsWith from "../src/endsWith.js";
import upperFirst from "../src/upperFirst.js";
import words from "../src/words.js";

describe("String functions", () => {

    describe("camelCase", () => {
        test("simple words", () => {
            expect(camelCase("Foo Bar")).toBe("fooBar");
            expect(camelCase("--foo-bar--")).toBe("fooBar");
            expect(camelCase("__FOO_BAR__")).toBe("fooBar");
        });
    });

    describe("capitalize", () => {
        test("basic capitalization", () => {
            expect(capitalize("FRED")).toBe("Fred");
            expect(capitalize("barney")).toBe("Barney");
        });
    });

    describe("endsWith", () => {
        test("basic endsWith behavior", () => {
            expect(endsWith("abc", "c")).toBe(true);
            expect(endsWith("abc", "b")).toBe(false);
            expect(endsWith("abc", "b", 2)).toBe(true);
        });
        test("target longer than string", () => {
            expect(endsWith("a", "abc")).toBe(false); // rivi 30: position < 0
        });

        test("position = 0", () => {
            expect(endsWith("abc", "a", 0)).toBe(false); // rivi 27: end = 0
        });

        test("position = string length", () => {
            expect(endsWith("abc", "c", 3)).toBe(true); // normaali tapaus
        });
    });

    describe("upperFirst", () => {
        test("only first character uppercase", () => {
            expect(upperFirst("fred")).toBe("Fred");
            expect(upperFirst("FRED")).toBe("FRED"); // voi palauttaa alkuperäisen
        });
    });

    describe("words", () => {
        test("splits ascii words", () => {
            expect(words("fred, barney, & pebbles")).toEqual(["fred", "barney", "pebbles"]);
            expect(words("fred, barney, & pebbles", /[^, ]+/g)).toEqual(["fred", "barney", "&", "pebbles"]);
        });
        test("pattern matches nothing", () => {
            expect(words("abc", /[0-9]+/g)).toEqual([]);  // ei yhtään numeroa
        });

        test("pattern matches something", () => {
            expect(words("abc 123 def", /\d+/g)).toEqual(["123"]);  // löytää numeron
        });
        test("unicode string triggers unicodeWords branch", () => {
            const str = "déjà vu"; // sisältää unicode-merkin é
            const result = words(str);
            expect(result).toEqual(["déjà", "vu"]); // unicodeWords pitäisi palauttaa nämä
        });
    });

});