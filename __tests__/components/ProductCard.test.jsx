import ProductCard from "@/components/ProductCard";
import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {
	createCategory,
	createIngredient,
	createProduct,
	createProductIngredient
} from "../utils";

describe("ProductCard", () => {
	it("renders product card", () => {
		const product = createProduct();

		render(<ProductCard product={product} />);

		const image = screen.getByRole("img");
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute("alt", `${product.name} product image`);
		expect(image).toHaveAttribute(
			"src",
			expect.stringContaining(encodeURIComponent(product.image))
		);

		const name = screen.getByText(product.name);
		expect(name).toBeInTheDocument();

		const weight = screen.getByText(new RegExp(`${product.weight}g`, "i"));
		expect(weight).toBeInTheDocument();

		const price = screen.getByText(`$${product.priceUsd}`);
		expect(price).toBeInTheDocument();
	});

	it("renders JSX passed to the buttonSlot prop", () => {
		const product = createProduct();

		render(
			<ProductCard
				product={product}
				buttonSlot={<div data-testid="buttonSlot" />}
			/>
		);

		const buttonSlotElement = screen.getByTestId("buttonSlot");
		expect(buttonSlotElement).toBeInTheDocument();
	});

	it("renders ingredients string when there are ingredients", () => {
		const product = createProduct(1, {
			ProductIngredients: [
				createProductIngredient(1, {
					Ingredient: createIngredient(1, {name: "egg"})
				}),
				createProductIngredient(2, {
					Ingredient: createIngredient(2, {name: "milk"})
				})
			]
		});

		render(<ProductCard product={product} />);

		const ingredients = screen.getByText(/- Egg, Milk/);
		expect(ingredients).toBeInTheDocument();
	});

	it("renders size in centimeters when it is specified", () => {
		const product = createProduct(1, {sizeCm: 30});

		render(<ProductCard product={product} />);

		const sizeCm = screen.getByText(new RegExp(`${product.sizeCm}cm`, "i"));
		expect(sizeCm).toBeInTheDocument();
	});

	it("doesn't render size in centimeters when it isn't specified", () => {
		const product = createProduct(1, {sizeCm: null});

		render(<ProductCard product={product} />);

		const sizeCm = screen.queryByText(/cm/i);
		expect(sizeCm).not.toBeInTheDocument();
	});

	it("renders weight in grams when the category name doesn't equal 'drink'", () => {
		const product = createProduct(1, {
			Category: createCategory(1, {name: "pizza"})
		});

		render(<ProductCard product={product} />);

		const weight = screen.getByText(new RegExp(`${product.weight}g`, "i"));
		expect(weight).toBeInTheDocument();
	});

	it("renders weight in milliliters when the category name equals 'drink'", () => {
		const product = createProduct(1, {
			Category: createCategory(1, {name: "drink"})
		});

		render(<ProductCard product={product} />);

		const weight = screen.getByText(new RegExp(`${product.weight}ml`, "i"));
		expect(weight).toBeInTheDocument();
	});

	it("renders spicy and vegan badges when product is spicy and vegan", () => {
		const product = createProduct(1, {isVegan: true, isSpicy: true});

		render(<ProductCard product={product} />);

		const spicyBadge = screen.getByText(/spicy/i);
		expect(spicyBadge).toBeInTheDocument();

		const veganBadge = screen.getByText(/vegan/i);
		expect(veganBadge).toBeInTheDocument();
	});

	it("doesn't render spicy and vegan badges when product is not spicy and vegan", () => {
		const product = createProduct(1, {isVegan: false, isSpicy: false});

		render(<ProductCard product={product} />);

		const spicyBadge = screen.queryByText(/spicy/i);
		expect(spicyBadge).not.toBeInTheDocument();

		const veganBadge = screen.queryByText(/vegan/i);
		expect(veganBadge).not.toBeInTheDocument();
	});
});
