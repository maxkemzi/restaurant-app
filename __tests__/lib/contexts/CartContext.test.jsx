import {createProduct} from "@/__tests__/utils";
import {CartProvider, useCartContext} from "@/src/lib/contexts";
import {fireEvent, render, screen, within} from "@testing-library/react";
import {expect, it, vi} from "vitest";

const CartConsumer = ({productToAdd, productIdToRemove}) => {
	const {totalCost, totalCount, products, addProduct, removeProduct} =
		useCartContext();

	const handleAddProduct = () => addProduct(productToAdd);
	const handleRemoveProduct = () => removeProduct(productIdToRemove);

	return (
		<div>
			<p data-testid="total-count">{totalCount}</p>
			<p data-testid="total-cost">{totalCost}</p>
			{products.map(product => (
				<div data-testid={`product-${product.id}`}>
					<p data-testid="id">{product.id}</p>
					<p data-testid="count">{product.count}</p>
				</div>
			))}
			<button onClick={handleAddProduct} type="button">
				Add product
			</button>
			<button onClick={handleRemoveProduct} type="button">
				Remove product
			</button>
		</div>
	);
};

it("provider provides children with default values", () => {
	render(<CartConsumer />);

	const totalCount = screen.getByTestId("total-count");
	expect(totalCount).toHaveTextContent("0");
	const totalCost = screen.getByTestId("total-cost");
	expect(totalCost).toHaveTextContent("0");
	const products = screen.queryAllByTestId(/product/);
	expect(products).toHaveLength(0);
});

const setUp = values => {
	const products = values?.products || [];
	const getItem = vi.spyOn(Storage.prototype, "getItem");
	getItem.mockReturnValue(JSON.stringify(products));
	const utils = render(<CartProvider>{values?.ui}</CartProvider>);

	return {...utils, products};
};

it("provider provides children with correct values from local storage", () => {
	const {products} = setUp({
		ui: <CartConsumer />,
		products: [
			{...createProduct(1, {priceUsd: 40}), count: 1},
			{...createProduct(2, {priceUsd: 20}), count: 4}
		]
	});

	const totalCount = screen.getByTestId("total-count");
	expect(totalCount).toHaveTextContent("5");
	const totalCost = screen.getByTestId("total-cost");
	expect(totalCost).toHaveTextContent("120");
	const productEls = screen.getAllByTestId(/product/);
	expect(productEls).toHaveLength(products.length);
	products.forEach(product => {
		const productEl = screen.getByTestId(`product-${product.id}`);
		const id = within(productEl).getByTestId("id");
		expect(id).toHaveTextContent(product.id);
		const count = within(productEl).getByTestId("count");
		expect(count).toHaveTextContent(product.count);
	});
});

it("adds product to state when the addProduct is called", () => {
	const newProduct = createProduct(1);
	setUp({ui: <CartConsumer productToAdd={newProduct} />, products: []});

	const addButton = screen.getByRole("button", {name: /add product/i});
	fireEvent.click(addButton);

	const newProductEl = screen.getByTestId(`product-${newProduct.id}`);
	expect(newProductEl).toBeInTheDocument();
	const id = within(newProductEl).getByTestId("id");
	expect(id).toHaveTextContent(newProduct.id);
	const count = within(newProductEl).getByTestId("count");
	expect(count).toHaveTextContent("1");
});

it("adds product to storage when the addProduct is called", () => {
	const newProduct = createProduct(1);
	const {products} = setUp({
		ui: <CartConsumer productToAdd={newProduct} />,
		products: []
	});

	const setItem = vi.spyOn(Storage.prototype, "setItem");
	const addButton = screen.getByRole("button", {name: /add product/i});
	fireEvent.click(addButton);

	const newCartProduct = {
		name: newProduct.name,
		image: newProduct.image,
		weight: newProduct.weight,
		id: newProduct.id,
		sizeCm: newProduct.sizeCm,
		priceUsd: newProduct.priceUsd,
		count: 1
	};
	const updatedProducts = [...products, newCartProduct];
	expect(setItem).toHaveBeenCalledWith(
		"cartProducts",
		JSON.stringify(updatedProducts)
	);
});

it("removes product from state when the removeProduct is called", async () => {
	const productId = 1;
	const products = [{...createProduct(productId), count: 1}];
	setUp({ui: <CartConsumer productIdToRemove={productId} />, products});

	const removeButton = screen.getByRole("button", {name: /remove product/i});
	fireEvent.click(removeButton);

	const productEl = screen.queryByTestId(`product-${productId}`);
	expect(productEl).not.toBeInTheDocument();
});

it("removes product from storage when the removeProduct is called", async () => {
	const productId = 1;
	const products = [
		{
			id: productId,
			name: "name",
			image: "image",
			weight: "weight",
			sizeCm: 0,
			priceUsd: 0,
			count: 1
		}
	];
	setUp({ui: <CartConsumer productIdToRemove={productId} />, products});

	const setItem = vi.spyOn(Storage.prototype, "setItem");
	const removeButton = screen.getByRole("button", {name: /remove product/i});
	fireEvent.click(removeButton);

	const updatedProducts = products.filter(el => el.id !== productId);
	expect(setItem).toHaveBeenCalledWith(
		"cartProducts",
		JSON.stringify(updatedProducts)
	);
});
