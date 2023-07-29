import {createProduct} from "@/__tests__/utils";
import Cart from "@/src/app/cart/page";
import {useCartContext, useToastContext} from "@/src/lib/contexts";
import {render, screen, within} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import {createCartContext, createToastContext} from "../utils";

vi.mock("@/src/app/cart/actions", () => ({
	placeOrder: vi.fn()
}));

vi.mock("next/navigation", () => ({
	...require("next-router-mock"),
	useSearchParams: vi.fn(),
	usePathname: vi.fn()
}));

vi.mock("@/src/lib/contexts", () => ({
	useCartContext: vi.fn(),
	useToastContext: vi.fn()
}));

const setUp = values => {
	const cartContext = values?.cartContext || createCartContext();
	useCartContext.mockReturnValue(cartContext);
	const toastContext = values?.toastContext || createToastContext();
	useToastContext.mockReturnValue(toastContext);
	const utils = render(<Cart />);

	return {...utils, toastContext, cartContext};
};

it("renders total cart products cost", () => {
	const {cartContext} = setUp();

	const totalCost = screen.getByTestId("total-cost");
	expect(totalCost).toBeInTheDocument();
	expect(totalCost).toHaveTextContent(`$${cartContext.totalCost}`);
});

describe("place order button", () => {
	it("renders button", () => {
		setUp();

		const placeOrderButton = screen.getByTestId("place-order-button");
		expect(placeOrderButton).toBeInTheDocument();
		expect(placeOrderButton).toHaveTextContent(/place an order/i);
		expect(placeOrderButton).toHaveAttribute("type", "submit");
	});

	it("renders non-disabled button if the product count is not equal to 0", () => {
		setUp({
			cartContext: createCartContext({
				products: [],
				totalCost: 0,
				totalCount: 5
			})
		});

		const placeOrderButton = screen.getByTestId("place-order-button");
		expect(placeOrderButton).not.toBeDisabled();
	});

	it("renders disabled button if the product count is equal to 0", () => {
		setUp({
			cartContext: createCartContext({
				products: [],
				totalCost: 0,
				totalCount: 0
			})
		});

		const placeOrderButton = screen.getByTestId("place-order-button");
		expect(placeOrderButton).toBeDisabled();
	});
});

it("renders text fields", () => {
	setUp();

	const nameField = screen.getByTestId("name-text-field");
	expect(nameField).toBeInTheDocument();
	const nameFieldLabel = within(nameField).getByText("Name");
	expect(nameFieldLabel).toBeInTheDocument();
	const nameFieldInput = within(nameField).getByRole("textbox");
	expect(nameFieldInput).toHaveAttribute("name", "clientName");
	expect(nameFieldInput).toHaveValue("");
	const phoneField = screen.getByTestId("phone-text-field");
	expect(phoneField).toBeInTheDocument();
	const phoneFieldLabel = within(phoneField).getByText("Phone number");
	expect(phoneFieldLabel).toBeInTheDocument();
	const phoneFieldInput = within(phoneField).getByRole("textbox");
	expect(phoneFieldInput).toHaveAttribute("name", "clientPhone");
	expect(phoneFieldInput).toHaveValue("");
	const addressField = screen.getByTestId("address-text-field");
	expect(addressField).toBeInTheDocument();
	const addressFieldLabel = within(addressField).getByText("Address");
	expect(addressFieldLabel).toBeInTheDocument();
	const addressFieldInput = within(addressField).getByRole("textbox");
	expect(addressFieldInput).toHaveAttribute("name", "clientAddress");
	expect(addressFieldInput).toHaveValue("");
});

describe("cart product list", () => {
	it("renders list if there is at least one product", () => {
		const products = [
			createProduct(1, {name: "Product 1", weight: 500, priceUsd: 40}),
			createProduct(2, {name: "Product 2", weight: 250, priceUsd: 20})
		];
		setUp({
			cartContext: createCartContext({
				products,
				totalCost: 0,
				totalCount: 0
			})
		});

		const cartProductCards = screen.getAllByTestId(/cart-product-card/);
		expect(cartProductCards).toHaveLength(products.length);
		products.forEach(product => {
			const cartProductCard = screen.getByTestId(
				`cart-product-card-${product.id}`
			);
			expect(cartProductCard).toBeInTheDocument();
			const name = within(cartProductCard).getByRole("heading", {
				name: new RegExp(product.name, "i")
			});
			expect(name).toBeInTheDocument();
			const weight = within(cartProductCard).getByText(
				new RegExp(`${product.weight} g`, "i")
			);
			expect(weight).toBeInTheDocument();
			const price = within(cartProductCard).getByText(
				new RegExp(`\\$${product.priceUsd}`, "i")
			);
			expect(price).toBeInTheDocument();
			const addToCartButton =
				within(cartProductCard).getByTestId("add-to-cart-button");
			expect(addToCartButton).toBeInTheDocument();
		});
	});

	it("renders fallback message if there are no products", () => {
		setUp({
			cartContext: createCartContext({
				products: [],
				totalCost: 0,
				totalCount: 0
			})
		});

		const fallbackMessage = screen.getByText(/your cart is empty/i);
		expect(fallbackMessage).toBeInTheDocument();
	});
});
