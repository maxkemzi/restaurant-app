import matchers from "@testing-library/jest-dom/matchers";
import {cleanup} from "@testing-library/react";
import {afterEach, beforeEach, expect, vi} from "vitest";

beforeEach(() => {
	vi.restoreAllMocks();
});

afterEach(() => {
	cleanup();
});

expect.extend(matchers);
