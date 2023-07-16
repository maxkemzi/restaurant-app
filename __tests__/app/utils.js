import {vi} from "vitest";

const createCartContext = (overrides = {}) => ({
	products: [],
	addProduct: vi.fn(),
	removeProduct: vi.fn(),
	totalCount: 0,
	totalCost: 0,
	...overrides
});

const createToastContext = (overrides = {}) => ({
	showToast: vi.fn(),
	...overrides
});

export {createCartContext, createToastContext};
