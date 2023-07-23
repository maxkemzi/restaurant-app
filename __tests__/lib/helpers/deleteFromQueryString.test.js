import {deleteFromQueryString} from "@/lib/helpers";
import {expect, it, describe} from "vitest";

describe("deletion of the parameter from the query string", () => {
	it("should work with an existing parameter", () => {
		const query = "color=red&size=large&price=20";
		const nameToDelete = "size";
		const expectedResult = "color=red&price=20";

		const result = deleteFromQueryString(query, nameToDelete);

		expect(result).toBe(expectedResult);
	});

	it("should work with the only parameter", () => {
		const query = "color=red";
		const nameToDelete = "color";
		const expectedResult = "";

		const result = deleteFromQueryString(query, nameToDelete);

		expect(result).toBe(expectedResult);
	});

	it("should throw an error if parameter doesn't exist", () => {
		const query = "color=red&size=large";
		const nameToDelete = "price";

		expect(() => deleteFromQueryString(query, nameToDelete)).toThrow(
			`Parameter with name '${nameToDelete}' doesn't exist in the query string provided.`
		);
	});

	it("should work parameter with special characters", () => {
		const query = "user=name%20with%20spaces&category=electronics";
		const nameToDelete = "user";
		const expectedResult = "category=electronics";

		const result = deleteFromQueryString(query, nameToDelete);

		expect(result).toBe(expectedResult);
	});
});
