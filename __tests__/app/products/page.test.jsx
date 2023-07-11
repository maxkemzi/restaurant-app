import {createProduct} from "@/__tests__/utils";
import Products from "@/app/products/page";
import {getProducts} from "@/lib/prisma/products";
import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";

vi.mock("@/lib/prisma/products", () => ({
	getProducts: vi.fn()
}));

vi.mock("next/navigation", () => ({
	...require("next-router-mock"),
	useSearchParams: () => ({get: vi.fn()}),
	usePathname: vi.fn()
}));

vi.mock("@/app/products/ProductFilters", () => ({
	default: () => <div data-testid="ProductFilters" />
}));

vi.mock("@/app/products/SortSelect", () => ({
	default: () => <div data-testid="SortSelect" />
}));

vi.mock("@/app/products/ProductList", () => ({
	default: () => <div data-testid="ProductList" />
}));

describe("Products", () => {
	it("renders products page", async () => {
		const products = [createProduct()];
		getProducts.mockResolvedValue(products);

		render(await Products({searchParams: {}}));

		expect(getProducts).toHaveBeenCalled();

		const productFilters = screen.getByTestId("ProductFilters");
		expect(productFilters).toBeInTheDocument();

		const sortSelect = screen.getByTestId("SortSelect");
		expect(sortSelect).toBeInTheDocument();

		const productList = screen.getByTestId("ProductList");
		expect(productList).toBeInTheDocument();
	});
});
