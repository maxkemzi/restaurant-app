import {deleteFromQueryString} from "@/lib/helpers";
import {expect, it} from "vitest";

it("should delete a param from the query string with 1 param", () => {
	const query = "param=value";

	const result = deleteFromQueryString(query, "param");
	expect(result).toBe("");
});

it("should delete a param from the query string with multiple params", () => {
	const query = "some_param=some_value&param=value";

	const result = deleteFromQueryString(query, "param");
	expect(result).toBe("some_param=some_value");
});

it("should throw an error if there are no param in the query string by specified name", () => {
	const query = "some_param=some_value";

	expect(() => {
		deleteFromQueryString(query, "param");
	}).toThrowError(
		`Parameter with name 'param' doesn't exist in the query string provided.`
	);
});
