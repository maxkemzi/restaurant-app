import {createProduct} from "@/__tests__/utils";
import TableProduct from "@/components/TableProduct";
import {render, screen} from "@testing-library/react";
import {describe, it, expect} from "vitest";

describe("TableProduct", () => {
	it("renders table product", () => {
		const product = createProduct();
		const count = 1;

		render(<TableProduct count={count} product={product} />);

		const heading = screen.getByRole("heading", {name: product.name});
		const countElement = screen.getByText(count);
		const image = screen.getByRole("img");

		expect(heading).toBeInTheDocument();
		expect(countElement).toBeInTheDocument();
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute("alt", `${product.name} image`);
		expect(image).toHaveAttribute(
			"src",
			expect.stringContaining(encodeURIComponent(product.image))
		);
	});
});
