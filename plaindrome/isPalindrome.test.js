const { describe, test, expect } = require("@jest/globals");
const isPalindrome = require("./isPalindrome");


const isPalindrome = require("./isPalindrome");

describe("isPalindrome", () => {

    describe("basic palindrome cases", () => {
        test("returns true for bob", () => {
            expect(isPalindrome("bob")).toBe(true);
        });

        test("returns true for racecar", () => {
            expect(isPalindrome("racecar")).toBe(true);
        });

        test("returns false for apple", () => {
            expect(isPalindrome("apple")).toBe(false);
        });
    });

    describe("case sensitivity", () => {
        test("ignores capitalization", () => {
            expect(isPalindrome("Racecar")).toBe(true);
        });

        test("ignores mixed capitalization", () => {
            expect(isPalindrome("RaCeCaR")).toBe(true);
        });
    });

    describe("spaces and punctuation", () => {
        test("ignores spaces", () => {
            expect(isPalindrome("taco cat")).toBe(true);
        });

        test("ignores punctuation", () => {
            expect(isPalindrome("A man, a plan, a canal: Panama")).toBe(true);
        });

        test("handles Madam I'm Adam", () => {
            expect(isPalindrome("Madam I'm Adam.")).toBe(true);
        });

        test("handles Red rum, sir, is murder", () => {
            expect(isPalindrome("Red rum, sir, is murder.")).toBe(true);
        });

        test("handles punctuation between every character", () => {
            expect(isPalindrome("r-a-c-e-c-a-r")).toBe(true);
        });
    });

    describe("non-palindromes", () => {
        test("returns false for a non-palindromic phrase", () => {
            expect(isPalindrome("hello world")).toBe(false);
        });

        test("returns false for a phrase that is not a palindrome", () => {
            expect(isPalindrome("This is not a palindrome")).toBe(false);
        });
    });

    describe("invalid input types", () => {
        test("returns false for numbers", () => {
            expect(isPalindrome(12321)).toBe(false);
        });

        test("returns false for arrays", () => {
            expect(isPalindrome(["r", "a", "c", "e", "c", "a", "r"])).toBe(false);
        });

        test("returns false for booleans", () => {
            expect(isPalindrome(true)).toBe(false);
        });

        test("returns false for objects", () => {
            expect(isPalindrome({ value: "racecar" })).toBe(false);
        });

        test("returns false for null", () => {
            expect(isPalindrome(null)).toBe(false);
        });

        test("returns false for undefined", () => {
            expect(isPalindrome(undefined)).toBe(false);
        });
    });

    describe("edge and extreme cases", () => {
        test("returns true for an empty string", () => {
            expect(isPalindrome("")).toBe(true);
        });

        test("returns true for a single character", () => {
            expect(isPalindrome("a")).toBe(true);
        });

        test("returns true for a string containing only punctuation", () => {
            expect(isPalindrome("!!!")).toBe(true);
        });

        test("returns true for a string containing only spaces", () => {
            expect(isPalindrome("     ")).toBe(true);
        });

        test("handles numbers inside a string", () => {
            expect(isPalindrome("12321")).toBe(true);
        });

        test("handles a very long palindrome", () => {
            const half = "a".repeat(100000);
            const palindrome = half + "b" + half.split("").reverse().join("");

            expect(isPalindrome(palindrome)).toBe(true);
        });

        test("handles a very long non-palindrome", () => {
            const palindrome = "a".repeat(100000) + "b";

            expect(isPalindrome(palindrome)).toBe(false);
        });

        test("handles a long palindrome with mixed capitalization", () => {
            const half = "AbCdEf".repeat(10000);
            const palindrome = half + half.split("").reverse().join("");

            expect(isPalindrome(palindrome)).toBe(true);
        });
    });
});
