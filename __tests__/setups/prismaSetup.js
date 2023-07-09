import {vi, beforeEach} from "vitest";

vi.mock("@/prisma/client");

beforeEach(() => {
	vi.restoreAllMocks();
});
