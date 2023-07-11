import AddToCartButton from "@/app/products/AddToCartButton";
import {useCartContext, useToastContext} from "@/lib/contexts";
import {CartProductDTO} from "@/lib/dtos";
import {fireEvent, render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import {createProduct} from "../../utils";
import {createToastContext, createCartContext} from "../utils";

vi.mock("@/lib/contexts", () => ({
	useCartContext: vi.fn(),
	useToastContext: vi.fn()
}));

describe("AddToCartButton", () => {
	describe("product is not in cart", () => {
		it("renders add to cart button", () => {
			const product = createProduct();
			const cartContext = createCartContext();
			const toastContext = createToastContext();
			useCartContext.mockReturnValue(cartContext);
			useToastContext.mockReturnValue(toastContext);

			render(<AddToCartButton product={product} />);

			const button = screen.getByRole("button", /add to cart/i);
			expect(button).toBeInTheDocument();
		});

		it("adds product to cart when the button is clicked", () => {
			const product = createProduct();
			const cartContext = createCartContext();
			const toastContext = createToastContext();
			useCartContext.mockReturnValue(cartContext);
			useToastContext.mockReturnValue(toastContext);

			render(<AddToCartButton product={product} />);

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

	describe("product is in cart", () => {
		it("renders product count and add/remove buttons", () => {
			const product = createProduct();
			const cartContext = createCartContext({
				cart: {products: {[product.id]: [new CartProductDTO(product)]}}
			});
			const toastContext = createToastContext();
			useCartContext.mockReturnValue(cartContext);
			useToastContext.mockReturnValue(toastContext);

			render(<AddToCartButton product={product} />);

			const removeButton = screen.getByTestId("remove-button");
			expect(removeButton).toBeInTheDocument();

			const addButton = screen.getByTestId("add-button");
			expect(addButton).toBeInTheDocument();

			const productCount = screen.getByText("1");
			expect(productCount).toBeInTheDocument();
		});

		it("removes product from cart when the remove button is clicked", () => {
			const product = createProduct();
			const cartContext = createCartContext({
				cart: {products: {[product.id]: [new CartProductDTO(product)]}}
			});
			const toastContext = createToastContext();
			useCartContext.mockReturnValue(cartContext);
			useToastContext.mockReturnValue(toastContext);

			render(<AddToCartButton product={product} />);

			const removeButton = screen.getByTestId("remove-button");
			fireEvent.click(removeButton);

			expect(cartContext.removeProduct).toHaveBeenCalledOnce();
			expect(cartContext.removeProduct).toHaveBeenCalledWith(product.id);
		});

		it("adds product to cart when the add button is clicked", () => {
			const product = createProduct();
			const cartContext = createCartContext({
				cart: {products: {[product.id]: [new CartProductDTO(product)]}}
			});
			const toastContext = createToastContext();
			useCartContext.mockReturnValue(cartContext);
			useToastContext.mockReturnValue(toastContext);

			render(<AddToCartButton product={product} />);

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
});
