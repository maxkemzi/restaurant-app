import {beforeEach} from "vitest";
import {mockDeep, mockReset} from "vitest-mock-extended";

const prismaMock = mockDeep();

beforeEach(() => {
	mockReset(prismaMock);
});

export default prismaMock;
