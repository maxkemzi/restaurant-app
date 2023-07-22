import {appendToQueryString} from "@/lib/helpers";
import {it, expect} from "vitest";

it("should append new param to the empty query string", () => {
	const query = "";
	const param = {name: "param", value: "value"};

	const result = appendToQueryString(query, param);
	expect(result).toBe("param=value");
});

it("should append new param to the non-empty query string", () => {
	const query = "some_param=some_value";
	const param = {name: "param", value: "value"};

	const result = appendToQueryString(query, param);
	expect(result).toBe("some_param=some_value&param=value");
});
