import AddToCartButton from "@/app/products/AddToCartButton";
import ProductCard from "@/app/products/ProductCard";
import ProductList from "@/app/products/ProductList";
import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import {createProduct} from "../../utils";

vi.mock("@/app/products/ProductCard");
vi.mock("@/app/products/AddToCartButton");

describe("ProductList", () => {
	it("renders product list", () => {
		const products = [createProduct(), createProduct(2)];

		render(<ProductList products={products} />);

		expect(ProductCard).toHaveBeenCalledTimes(products.length);
		expect(ProductCard.mock.calls).toEqual(
			products.map(product => [
				expect.objectContaining({product}),
				expect.anything()
			])
		);
		expect(AddToCartButton).toHaveBeenCalledTimes(products.length);
		expect(AddToCartButton.mock.calls).toEqual(
			products.map(product => [
				expect.objectContaining({product}),
				expect.anything()
			])
		);
	});

	it("renders fallback message if products list is empty", () => {
		const products = [];

		render(<ProductList products={products} />);

		const fallbackText = screen.getByText(/there are no products/i);
		expect(fallbackText).toBeInTheDocument();
	});
});
