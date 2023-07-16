import {createProduct} from "@/__tests__/utils";
import {CartProvider, useCartContext} from "@/lib/contexts";
import CartProductDTO from "@/lib/contexts/CartContext/CartProductDTO";
import {useStorageState} from "@/lib/hooks";
import {render, screen, within} from "@testing-library/react";
import {expect, it, vi} from "vitest";

vi.mock("@/lib/hooks", () => ({useStorageState: vi.fn()}));

const CartConsumer = () => {
	const {totalCost, totalCount, products} = useCartContext();

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
		</div>
	);
};

const customRender = (ui, options) =>
	render(<CartProvider>{ui}</CartProvider>, options);

it("provides default values", () => {
	render(<CartConsumer />);

	const totalCount = screen.getByTestId("total-count");
	expect(totalCount).toHaveTextContent("0");
	const totalCost = screen.getByTestId("total-cost");
	expect(totalCost).toHaveTextContent("0");
	const products = screen.queryAllByTestId(/product/);
	expect(products).toHaveLength(0);
});

it("provides products and correct total count and total cost values depending on the products", () => {
	const products = [
		{...new CartProductDTO(createProduct(1, {priceUsd: 40})), count: 1},
		{...new CartProductDTO(createProduct(2, {priceUsd: 20})), count: 4}
	];
	useStorageState.mockReturnValue([products, vi.fn()]);
	customRender(<CartConsumer />);

	const totalCount = screen.getByTestId("total-count");
	expect(totalCount).toHaveTextContent(products[0].count + products[1].count);
	const totalCost = screen.getByTestId("total-cost");
	expect(totalCost).toHaveTextContent(
		products[0].priceUsd * products[0].count +
			products[1].priceUsd * products[1].count
	);
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
