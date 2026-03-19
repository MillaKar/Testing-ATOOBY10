// test/text.test.js
// Tests string fucntions
import camelCase from "../src/camelCase.js";
import capitalize from "../src/capitalize.js";
import endsWith from "../src/endsWith.js";
import upperFirst from "../src/upperFirst.js";
import words from "../src/words.js";

describe("String functions", () => {

    //camelCase
    describe("camelCase", () => {
        test("simple words", () => {
            expect(camelCase("Moi Hei")).toBe("moiHei");
            expect(camelCase("--moi-hei--")).toBe("moiHei");
            expect(camelCase("__MOI_HEI__")).toBe("moiHei");
        });
    });

    //Capitalize
    describe("capitalize", () => {
        test("basic capitalization", () => {
            expect(capitalize("MOI")).toBe("Moi");
            expect(capitalize("moi")).toBe("Moi");
        });
    });

    //EndsWith
    describe("endsWith", () => {
        test("basic endsWith behavior", () => {
            expect(endsWith("abc", "c")).toBe(true);
            expect(endsWith("abc", "b")).toBe(false);
            expect(endsWith("abc", "b", 2)).toBe(true);
        });
        test("target longer than string", () => {
            expect(endsWith("a", "abc")).toBe(false);
        });

        test("position = 0", () => {
            expect(endsWith("abc", "a", 0)).toBe(false);
        });

        test("position = string length", () => {
            expect(endsWith("abc", "c", 3)).toBe(true);
        });
    });

    //upperFirst
    describe("upperFirst", () => {
        test("only first character uppercase", () => {
            expect(upperFirst("milla")).toBe("Milla");
            expect(upperFirst("MILLA")).toBe("MILLA");
        });
    });

    //Words
    describe("words", () => {
        test("splits ascii words", () => {
            expect(words("moi, heippa, & hyvasti")).toEqual(["moi", "heippa", "hyvasti"]);
            expect(words("moi, heippa, & hyvasti", /[^, ]+/g)).toEqual(["moi", "heippa", "&", "hyvasti"]);
        });
        test("pattern matches nothing", () => {
            expect(words("abc", /[0-9]+/g)).toEqual([]);
        });

        test("pattern matches something", () => {
            expect(words("abc 123 def", /\d+/g)).toEqual(["123"]);
        });
        test("unicode string triggers unicodeWords branch", () => {
            const str = "déjà vu";
            const result = words(str);
            expect(result).toEqual(["déjà", "vu"]);
        });
    });

});