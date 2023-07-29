import {appendToQueryString} from "@/src/lib/helpers";
import {describe, expect, it} from "vitest";

describe("appendix of a new parameter to the query string", () => {
	it("should work with an empty query string", () => {
		const query = "";
		const param = {name: "param", value: "value"};

		const result = appendToQueryString(query, param);

		expect(result).toBe("param=value");
	});

	it("should work with a non-empty query string", () => {
		const query = "name=value";
		const param = {name: "param", value: "value"};

		const result = appendToQueryString(query, param);

		expect(result).toBe("name=value&param=value");
	});

	it("should work with special characters", () => {
		const query = "name=value";
		const param = {name: "key=value&", value: "a@b.com"};

		const result = appendToQueryString(query, param);

		expect(result).toBe("name=value&key%3Dvalue%26=a%40b.com");
	});

	it("should with the same parameter name", () => {
		const query = "name=value1";
		const param = {name: "name", value: "value2"};

		const result = appendToQueryString(query, param);

		expect(result).toBe("name=value1&name=value2");
	});

	it("should properly URL-encode name and value", () => {
		const query = "name=value";
		const param = {name: "hello world", value: "hello#world"};

		const result = appendToQueryString(query, param);

		expect(result).toBe("name=value&hello+world=hello%23world");
	});

	it("should work with an empty name", () => {
		const query = "";
		const param = {name: "", value: "value"};

		const result = appendToQueryString(query, param);

		expect(result).toBe("=value");
	});

	it("should work with an empty value", () => {
		const query = "";
		const param = {name: "name", value: ""};

		const result = appendToQueryString(query, param);

		expect(result).toBe("name=");
	});
});
