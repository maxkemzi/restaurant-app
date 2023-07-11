import {vi} from "vitest";

const createCartContext = (overrides = {}) => ({
	addProduct: vi.fn(),
	removeProduct: vi.fn(),
	cart: {count: 0, cost: 0, products: {}},
	...overrides
});

const createToastContext = (overrides = {}) => ({
	showToast: vi.fn(),
	...overrides
});

export {createCartContext, createToastContext};
