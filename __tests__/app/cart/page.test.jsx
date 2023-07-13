import {createProduct} from "@/__tests__/utils";
import Cart from "@/app/cart/page";
import {useCartContext, useToastContext} from "@/lib/contexts";
import {CartProductDTO} from "@/lib/dtos";
import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import {createCartContext, createToastContext} from "../utils";

vi.mock("next/navigation", () => ({
	...require("next-router-mock"),
	useSearchParams: () => ({get: vi.fn()}),
	usePathname: vi.fn()
}));

vi.mock("@/lib/contexts", () => ({
	useCartContext: vi.fn(),
	useToastContext: vi.fn()
}));

vi.mock("@/components/AddToCartButton", () => ({
	default: () => (
		<button type="button" data-testid="AddToCartButton">
			AddToCartButton
		</button>
	)
}));

describe("Cart", () => {
	it("renders cart page", () => {
		const cartContext = createCartContext();
		useCartContext.mockReturnValue(cartContext);
		const toastContext = createToastContext();
		useToastContext.mockReturnValue(toastContext);

		render(<Cart />);

		const nameField = screen.getByRole("textbox", {name: /name/i});
		const phoneField = screen.getByRole("textbox", {name: /phone number/i});
		const addressField = screen.getByRole("textbox", {name: /address/i});
		const cost = screen.getByText(`$${cartContext.cart.cost}`);
		const placeOrderButton = screen.getByRole("button", {
			name: /place an order/i
		});

		expect(nameField).toBeInTheDocument();
		expect(phoneField).toBeInTheDocument();
		expect(addressField).toBeInTheDocument();
		expect(cost).toBeInTheDocument();
		expect(placeOrderButton).toBeInTheDocument();
	});

	it("renders cart products", () => {
		const products = {
			1: [
				new CartProductDTO(
					createProduct(1, {name: "Product 1", weight: 500, priceUsd: 40})
				)
			],
			2: [
				new CartProductDTO(
					createProduct(2, {name: "Product 2", weight: 250, priceUsd: 20})
				)
			]
		};
		const cartContext = createCartContext({
			cart: {
				count: 2,
				cost: 0,
				products
			}
		});
		useCartContext.mockReturnValue(cartContext);
		const toastContext = createToastContext();
		useToastContext.mockReturnValue(toastContext);

		render(<Cart />);

		const addToCartButtons = screen.getAllByTestId("AddToCartButton");

		Object.values(products).forEach(productArr => {
			const product = productArr[0];

			const name = screen.getByRole("heading", {
				name: new RegExp(product.name, "i")
			});
			const weight = screen.getByText(new RegExp(`${product.weight} g`, "i"));
			const price = screen.getByText(new RegExp(`\\$${product.priceUsd}`, "i"));

			expect(name).toBeInTheDocument();
			expect(weight).toBeInTheDocument();
			expect(price).toBeInTheDocument();
		});
		expect(addToCartButtons).toHaveLength(Object.keys(products).length);
	});
});
