import {createProduct} from "@/__tests__/utils";
import TableProduct from "@/src/components/TableProduct";
import {render, screen} from "@testing-library/react";
import {expect, it} from "vitest";

it("renders table product", () => {
	const product = createProduct();
	const count = 1;
	render(<TableProduct count={count} product={product} />);

	const heading = screen.getByRole("heading", {name: product.name});
	expect(heading).toBeInTheDocument();
	const countElement = screen.getByText(count);
	expect(countElement).toBeInTheDocument();
	const image = screen.getByRole("img");
	expect(image).toBeInTheDocument();
	expect(image).toHaveAttribute("alt", `${product.name} image`);
	expect(image).toHaveAttribute(
		"src",
		expect.stringContaining(encodeURIComponent(product.image))
	);
});
