import {parseQueryParams} from "@/lib/helpers";
import {it, expect, describe} from "vitest";

describe("parsing query parameters", () => {
	it("should parse an empty parameters object", () => {
		const result = parseQueryParams({});

		expect(result).toEqual({});
	});

	it("should parse a complex parameters object", () => {
		const params = {
			age: "30",
			name: "Alice",
			verified: "true",
			points: "100",
			status: null
		};
		const expectedResult = {
			age: 30,
			name: "Alice",
			verified: true,
			points: 100,
			status: undefined
		};

		const result = parseQueryParams(params);

		expect(result).toEqual(expectedResult);
	});

	it("should parse null values", () => {
		const params = {param: null};
		const expectedResult = {param: undefined};

		const result = parseQueryParams(params);

		expect(result).toEqual(expectedResult);
	});

	it("should parse number string values", () => {
		const params = {age: "25", quantity: "0", count: "1000", pi: "3.14"};
		const expectedResult = {age: 25, quantity: 0, count: 1000, pi: 3.14};

		const result = parseQueryParams(params);

		expect(result).toEqual(expectedResult);
	});

	it("should parse string values", () => {
		const params = {name: "John", status: "active", role: ""};
		const expectedResult = {name: "John", status: "active", role: ""};

		const result = parseQueryParams(params);

		expect(result).toEqual(expectedResult);
	});

	it("should parse boolean string values", () => {
		const params = {active: "true", valid: "false"};
		const expectedResult = {active: true, valid: false};

		const result = parseQueryParams(params);

		expect(result).toEqual(expectedResult);
	});
});
