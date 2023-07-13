import {
	createCart,
	createCartProduct,
	createOrder,
	createProduct
} from "@/__tests__/utils";
import OrderTableRow from "@/components/OrderTableRow";
import {OrderStatus} from "@/lib/constants";
import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";

vi.mock("@/components/TableProduct", () => ({
	default: () => <div data-testid="TableProduct" />
}));

describe("OrderTableRow", () => {
	it("renders order table row", () => {
		const products = [
			createProduct(1, {name: "Product 1", priceUsd: 20}),
			createProduct(2, {name: "Product 2", priceUsd: 20})
		];
		const order = createOrder(1, {
			Cart: createCart(1, {
				CartProducts: [
					createCartProduct(1, {Product: products[0]}),
					createCartProduct(2, {Product: products[0]}),
					createCartProduct(3, {Product: products[1]})
				]
			})
		});

		render(<OrderTableRow order={order} />);

		const id = screen.getByText(order.id);
		expect(id).toBeInTheDocument();
		const clientName = screen.getByRole("cell", {
			name: new RegExp(order.clientName, "i")
		});
		expect(clientName).toBeInTheDocument();
		const clientPhone = screen.getByText(new RegExp(order.clientPhone, "i"));
		expect(clientPhone).toBeInTheDocument();
		const clientAddress = screen.getByText(
			new RegExp(order.clientAddress, "i")
		);
		expect(clientAddress).toBeInTheDocument();

		const tableProducts = screen.getAllByTestId("TableProduct");
		expect(tableProducts).toHaveLength(products.length);
	});

	it("renders correct status text", () => {
		const newOrder = createOrder(1, {status: OrderStatus.NEW});
		const pendingOrder = createOrder(1, {status: OrderStatus.IN_PROGRESS});
		const completedOrder = createOrder(1, {status: OrderStatus.COMPLETED});

		render(<OrderTableRow order={newOrder} />);

		const newStatus = screen.getByText(/new/i);
		expect(newStatus).toBeInTheDocument();

		render(<OrderTableRow order={pendingOrder} />);

		const pendingStatus = screen.getByText(/in progress/i);
		expect(pendingStatus).toBeInTheDocument();

		render(<OrderTableRow order={completedOrder} />);

		const completedStatus = screen.getByText(/completed/i);
		expect(completedStatus).toBeInTheDocument();
	});

	it("renders custom actions slot", () => {
		const order = createOrder();
		const slotContent = "Custom Actions Slot";

		render(
			<OrderTableRow order={order} actionsSlot={<div>{slotContent}</div>} />
		);

		const actionsSlot = screen.getByText(slotContent);
		expect(actionsSlot).toBeInTheDocument();
	});
});
