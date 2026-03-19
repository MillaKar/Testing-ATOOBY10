//math.test.js
//Tests usual math operations, for example divide and add.
import divide from "../src/divide.js";
import add from "../src/add.js";
import ceil from "../src/ceil.js";

//Divide
describe("divide function", () => {
    test("6 / 3 = 2", () => {
        expect(divide(6, 3)).toBe(2);
    });
    //testing desimals
    test("7 / 2 = 3.5", () => {
        expect(divide(7, 2)).toBe(3.5);
    });
});

//Add
describe("add function", () => {
    test("2 + 3 = 5", () => {
        expect(add(2, 3)).toBe(5);
    });
    test("-1 + 1 = 0", () => {
        expect(add(-1, 1)).toBe(0);
    });
});

//Ceil
describe("ceil function", () => {

    test("ceil without precision rounds up to nearest integer", () => {
        expect(ceil(4.006)).toBe(5);
        expect(ceil(-1.3)).toBe(-1);
        expect(ceil(5)).toBe(5);
    });
    test("ceil with positive precision rounds up to that decimal place", () => {
        expect(ceil(6.004, 2)).toBe(6.01);
        expect(ceil(1.2345, 3)).toBe(1.235);
    });
    test("ceil with negative precision rounds up to tens/hundreds", () => {
        expect(ceil(6040, -2)).toBe(6100);
        expect(ceil(1234, -1)).toBe(1240);
    });

});