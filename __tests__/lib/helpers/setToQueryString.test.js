import {setToQueryString} from "@/lib/helpers";
import {expect, it, describe} from "vitest";

describe("settings a new parameter to the query string", () => {
	it("should work with an empty query string", () => {
		const query = "";
		const param = {name: "param", value: "value"};

		const result = setToQueryString(query, param);

		expect(result).toBe("param=value");
	});

	it("should update the existing parameter", () => {
		const query = "color=red&size=large&price=20";
		const paramToUpdate = {name: "price", value: "25"};
		const expectedResult = "color=red&size=large&price=25";

		const result = setToQueryString(query, paramToUpdate);

		expect(result).toBe(expectedResult);
	});

	it("should work with parameter with special characters in the value", () => {
		const query = "product=shoes";
		const paramToAdd = {name: "description", value: "These are men's shoes"};
		const expectedResult = "product=shoes&description=These+are+men%27s+shoes";

		const result = setToQueryString(query, paramToAdd);

		expect(result).toBe(expectedResult);
	});

	it("should work with parameter with special characters in the name", () => {
		const query = "user=name+with+spaces&category=electronics";
		const paramToAdd = {name: "user[email]", value: "example@example.com"};
		const expectedResult =
			"user=name+with+spaces&category=electronics&user%5Bemail%5D=example%40example.com";

		const result = setToQueryString(query, paramToAdd);

		expect(result).toBe(expectedResult);
	});
});
