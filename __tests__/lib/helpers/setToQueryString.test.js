import {setToQueryString} from "@/lib/helpers";
import {expect, it} from "vitest";

it("should set a param to the empty query string", () => {
	const query = "";
	const param = {name: "param", value: "value"};

	const result = setToQueryString(query, param);
	expect(result).toBe("param=value");
});

it("should set a param to the non-empty query string", () => {
	const query = "some_param=some_value";
	const param = {name: "param", value: "value"};

	const result = setToQueryString(query, param);
	expect(result).toBe("some_param=some_value&param=value");
});
