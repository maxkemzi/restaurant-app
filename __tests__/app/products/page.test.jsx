import {createProduct} from "@/__tests__/utils";
import Products from "@/app/products/page";
import {getProducts} from "@/lib/prisma/products";
import {render, screen, within} from "@testing-library/react";
import {useSearchParams} from "next/navigation";
import {describe, expect, it, vi} from "vitest";

vi.mock("@/lib/prisma/products", () => ({
	getProducts: vi.fn()
}));

vi.mock("next/navigation", () => ({
	...require("next-router-mock"),
	useSearchParams: vi.fn(),
	usePathname: vi.fn()
}));

const setUp = async values => {
	useSearchParams.mockReturnValue(new URLSearchParams());
	const products = values?.products || [];
	getProducts.mockReturnValue(products);
	const utils = render(await Products({searchParams: {}}));

	return {...utils, products};
};

describe("product filters", () => {
	it("renders filters if there is at least one vegan product", async () => {
		await setUp({products: [createProduct(1, {isVegan: true})]});

		const productFilters = screen.getByTestId("product-filters");
		expect(productFilters).toBeInTheDocument();
	});

	it("renders filters if there is at least one spicy product", async () => {
		await setUp({products: [createProduct(1, {isSpicy: true})]});

		const productFilters = screen.getByTestId("product-filters");
		expect(productFilters).toBeInTheDocument();
	});

	it("doesn't render filters if there are no either vegan or spicy products", async () => {
		await setUp({
			products: [
				createProduct(1, {isVegan: false}),
				createProduct(2, {isSpicy: false})
			]
		});

		const productFilters = screen.queryByTestId("product-filters");
		expect(productFilters).not.toBeInTheDocument();
	});
});

it("renders sort select", async () => {
	await setUp();

	const select = screen.getByTestId("sort-select");
	expect(select).toBeInTheDocument();

	const sortByOption = screen.getByTestId("sort-by-option");
	expect(sortByOption).toBeInTheDocument();
	expect(sortByOption).toHaveTextContent(/sort by/i);
	expect(sortByOption).toHaveValue("");

	const priceLowToHighOption = screen.getByTestId("price-asc-option");
	expect(priceLowToHighOption).toBeInTheDocument();
	expect(priceLowToHighOption).toHaveTextContent(/Price: Low to High/i);
	expect(priceLowToHighOption).toHaveValue("priceAsc");

	const priceHighToLowOption = screen.getByTestId("price-desc-option");
	expect(priceHighToLowOption).toBeInTheDocument();
	expect(priceHighToLowOption).toHaveTextContent(/Price: High to Low/i);
	expect(priceHighToLowOption).toHaveValue("priceDesc");
});

describe("product list", () => {
	it("renders list if there is at least one product", async () => {
		const {products} = await setUp({
			products: [createProduct(), createProduct(2)]
		});

		const productCards = screen.getAllByTestId(/product-card/);
		expect(productCards).toHaveLength(products.length);
		products.forEach(product => {
			const productCard = screen.getByTestId(`product-card-${product.id}`);
			expect(productCard).toBeInTheDocument();
			const addToCartButton =
				within(productCard).getByTestId("add-to-cart-button");
			expect(addToCartButton).toBeInTheDocument();
		});
	});

	it("renders fallback message if there are no products", async () => {
		await setUp({products: []});

		const fallbackMessage = screen.getByText(/there are no products/i);
		expect(fallbackMessage).toBeInTheDocument();
	});
});
