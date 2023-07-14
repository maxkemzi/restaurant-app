import AddToCartButton from "@/components/AddToCartButton";
import {useCartContext, useToastContext} from "@/lib/contexts";
import {CartProductDTO} from "@/lib/dtos";
import {fireEvent, render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import {createProduct} from "../utils";
import {createToastContext, createCartContext} from "../app/utils";

vi.mock("@/lib/contexts", () => ({
	useCartContext: vi.fn(),
	useToastContext: vi.fn()
}));

const setUp = values => {
	const product = values?.product || createProduct();
	const cartContext = values?.cartContext || createCartContext();
	useCartContext.mockReturnValue(cartContext);
	const toastContext = values?.toastContext || createToastContext();
	useToastContext.mockReturnValue(toastContext);
	const utils = render(<AddToCartButton product={product} />);

	return {...utils, product, cartContext, toastContext};
};

describe("add to cart button (if product is not in cart)", () => {
	it("renders add to cart button", () => {
		setUp();

		const button = screen.getByRole("button", /add to cart/i);
		expect(button).toBeInTheDocument();
	});

	it("adds product to cart when the button is clicked", () => {
		const {cartContext, product, toastContext} = setUp();

		const button = screen.getByRole("button", /add to cart/i);
		fireEvent.click(button);

		expect(cartContext.addProduct).toHaveBeenCalledOnce();
		expect(cartContext.addProduct).toHaveBeenCalledWith(
			new CartProductDTO(product)
		);
		expect(toastContext.showToast).toHaveBeenCalledOnce();
		expect(toastContext.showToast).toHaveBeenCalledWith(
			"success",
			"Product has been added to cart"
		);
	});
});

describe("add/remove from cart buttons (if product is in cart)", () => {
	it("renders product count and add/remove buttons", () => {
		const product = createProduct();
		setUp({
			product,
			cartContext: createCartContext({
				cart: {products: {[product.id]: [new CartProductDTO(product)]}}
			})
		});

		const removeButton = screen.getByTestId("remove-button");
		expect(removeButton).toBeInTheDocument();
		const addButton = screen.getByTestId("add-button");
		expect(addButton).toBeInTheDocument();
		const productCount = screen.getByTestId("product-count");
		expect(productCount).toBeInTheDocument();
		expect(productCount).toHaveTextContent("1");
	});

	it("removes product from cart when the remove button is clicked", () => {
		const product = createProduct();
		const {cartContext} = setUp({
			product,
			cartContext: createCartContext({
				cart: {products: {[product.id]: [new CartProductDTO(product)]}}
			})
		});

		const removeButton = screen.getByTestId("remove-button");
		fireEvent.click(removeButton);

		expect(cartContext.removeProduct).toHaveBeenCalledOnce();
		expect(cartContext.removeProduct).toHaveBeenCalledWith(product.id);
	});

	it("adds product to cart when the add button is clicked", () => {
		const product = createProduct();
		const {cartContext, toastContext} = setUp({
			product,
			cartContext: createCartContext({
				cart: {products: {[product.id]: [new CartProductDTO(product)]}}
			})
		});

		const addButton = screen.getByTestId("add-button");
		fireEvent.click(addButton);

		expect(cartContext.addProduct).toHaveBeenCalledOnce();
		expect(cartContext.addProduct).toHaveBeenCalledWith(
			new CartProductDTO(product)
		);
		expect(toastContext.showToast).toHaveBeenCalledOnce();
		expect(toastContext.showToast).toHaveBeenCalledWith(
			"success",
			"Product has been added to cart"
		);
	});
});
