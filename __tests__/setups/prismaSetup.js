import {beforeEach, vi} from "vitest";

vi.mock("@/src/prisma/client");

beforeEach(() => {
	vi.restoreAllMocks();
});
