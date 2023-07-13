import {createProduct} from "@/__tests__/utils";
import Products from "@/app/products/page";
import {getProducts} from "@/lib/prisma/products";
import {render, screen, within} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";

vi.mock("@/lib/prisma/products", () => ({
	getProducts: vi.fn()
}));

vi.mock("next/navigation", () => ({
	...require("next-router-mock"),
	useSearchParams: () => ({get: vi.fn()}),
	usePathname: vi.fn()
}));

vi.mock("@/components/ProductCard", () => ({
	default: ({buttonSlot}) => <div data-testid="ProductCard">{buttonSlot}</div>
}));

vi.mock("@/components/AddToCartButton", () => ({
	default: () => (
		<button type="button" data-testid="AddToCartButton">
			AddToCartButton
		</button>
	)
}));

describe("Products", () => {
	describe("renders product filters", () => {
		it("renders all filters if there are vegan and spicy products", async () => {
			const products = [
				createProduct(1, {isSpicy: true}),
				createProduct(2, {isVegan: true})
			];
			getProducts.mockReturnValue(products);

			render(await Products({searchParams: {}}));

			const spicyFilter = screen.getByLabelText("Spicy");
			expect(spicyFilter).toBeInTheDocument();

			const veganFilter = screen.getByLabelText("Vegan");
			expect(veganFilter).toBeInTheDocument();
		});

		it("doesn't render filters if there are no either vegan or spicy products", async () => {
			const products = [];
			getProducts.mockReturnValue(products);

			render(await Products({searchParams: {}}));

			const spicyFilter = screen.queryByLabelText("Spicy");
			expect(spicyFilter).not.toBeInTheDocument();

			const veganFilter = screen.queryByLabelText("Vegan");
			expect(veganFilter).not.toBeInTheDocument();
		});

		it("renders only spicy filter if there are only spicy products", async () => {
			const products = [createProduct(1, {isSpicy: true})];
			getProducts.mockReturnValue(products);

			render(await Products({searchParams: {}}));

			const spicyFilter = screen.getByLabelText("Spicy");
			expect(spicyFilter).toBeInTheDocument();

			const veganFilter = screen.queryByLabelText("Vegan");
			expect(veganFilter).not.toBeInTheDocument();
		});

		it("renders only vegan filter if there are only vegan products", async () => {
			const products = [createProduct(1, {isVegan: true})];
			getProducts.mockReturnValue(products);

			render(await Products({searchParams: {}}));

			const spicyFilter = screen.queryByLabelText("Spicy");
			expect(spicyFilter).not.toBeInTheDocument();

			const veganFilter = screen.getByLabelText("Vegan");
			expect(veganFilter).toBeInTheDocument();
		});
	});

	it("renders sort select", async () => {
		const products = [];
		getProducts.mockReturnValue(products);

		render(await Products({searchParams: {}}));

		const select = screen.getByRole("combobox");
		expect(select).toBeInTheDocument();

		const sortByOption = within(select).getByRole("option", {
			name: /sort by/i,
			value: ""
		});
		expect(sortByOption).toBeInTheDocument();

		const priceLowToHighOption = within(select).getByRole("option", {
			name: /Price: Low to High/i,
			value: "priceAsc"
		});
		expect(priceLowToHighOption).toBeInTheDocument();

		const priceHighToLowOption = within(select).getByRole("option", {
			name: /Price: High to Low/i,
			value: "priceDesc"
		});
		expect(priceHighToLowOption).toBeInTheDocument();
	});

	describe("renders product list", () => {
		it("successfully renders product list", async () => {
			const products = [createProduct(), createProduct(2)];
			getProducts.mockReturnValue(products);

			render(await Products({searchParams: {}}));

			const productCards = screen.getAllByTestId("ProductCard");
			expect(productCards).toHaveLength(products.length);

			const addToCartButtons = screen.getAllByTestId("AddToCartButton");
			expect(addToCartButtons).toHaveLength(products.length);
		});

		it("renders fallback message when products list is empty", async () => {
			const products = [];
			getProducts.mockReturnValue(products);

			render(await Products({searchParams: {}}));

			const fallbackText = screen.getByText(/there are no products/i);
			expect(fallbackText).toBeInTheDocument();
		});
	});
});
