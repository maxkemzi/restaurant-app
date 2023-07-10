import AddToCartButton from "@/app/products/AddToCartButton";
import ProductCard from "@/app/products/ProductCard";
import ProductList from "@/app/products/ProductList";
import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import {createProductMock} from "@/prisma/__mocks__/product";

vi.mock("@/app/products/ProductCard");
vi.mock("@/app/products/AddToCartButton");

describe("ProductList", () => {
	it("renders product list", () => {
		const mockProducts = [createProductMock(1), createProductMock(2)];

		render(<ProductList products={mockProducts} />);

		expect(ProductCard).toHaveBeenCalledTimes(mockProducts.length);
		expect(ProductCard.mock.calls).toEqual(
			mockProducts.map(product => [
				expect.objectContaining({product}),
				expect.anything()
			])
		);
		expect(AddToCartButton).toHaveBeenCalledTimes(mockProducts.length);
		expect(AddToCartButton.mock.calls).toEqual(
			mockProducts.map(product => [
				expect.objectContaining({product}),
				expect.anything()
			])
		);
	});

	it("renders fallback message if products list is empty", () => {
		const mockProducts = [];

		render(<ProductList products={mockProducts} />);

		const fallbackText = screen.getByText(/there are no products/i);
		expect(fallbackText).toBeInTheDocument();

		expect(ProductCard).not.toHaveBeenCalled();
	});
});
