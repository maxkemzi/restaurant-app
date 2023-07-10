import PizzaFilters from "@/app/products/PizzaFilters";
import ProductList from "@/app/products/ProductList";
import SortSelect from "@/app/products/SortSelect";
import Products from "@/app/products/page";
import {getProducts} from "@/lib/prisma/products";
import {createProductMock} from "@/prisma/__mocks__/product";
import {render} from "@testing-library/react";
import {describe, it, vi, expect} from "vitest";

vi.mock("@/lib/prisma/products", () => ({
	getProducts: vi.fn()
}));

vi.mock("next/navigation", () => ({
	...require("next-router-mock"),
	useSearchParams: () => ({get: vi.fn()}),
	usePathname: vi.fn()
}));

vi.mock("@/app/products/ProductList");

vi.mock("@/app/products/SortSelect");

vi.mock("@/app/products/PizzaFilters");

describe("Products", () => {
	it("renders products page", async () => {
		const mockProducts = [createProductMock(1)];
		getProducts.mockResolvedValue(mockProducts);

		render(await Products({searchParams: {}}));

		expect(SortSelect).toHaveBeenCalled();
		expect(ProductList).toHaveBeenCalledWith(
			expect.objectContaining({products: mockProducts}),
			expect.anything()
		);
	});

	it("renders pizza filters when the category equals to pizza", async () => {
		const mockProducts = [createProductMock(1)];
		getProducts.mockResolvedValue(mockProducts);

		render(await Products({searchParams: {category: "pizza"}}));

		expect(PizzaFilters).toHaveBeenCalled();
	});
});
