import {deleteOrder} from "@/app/my-orders/actions";
import MyOrders from "@/app/my-orders/page";
import {useToastContext} from "@/lib/contexts";
import {getOrdersByClientId} from "@/lib/prisma/orders";
import {
	fireEvent,
	render,
	screen,
	waitFor,
	within
} from "@testing-library/react";
import {cookies} from "next/headers";
import {describe, expect, it, vi} from "vitest";
import {createOrder} from "../../utils";
import {createToastContext} from "../utils";

vi.mock("next/headers", () => ({
	cookies: vi.fn()
}));

vi.mock("@/lib/prisma/orders", () => ({
	getOrdersByClientId: vi.fn()
}));

vi.mock("@/app/my-orders/actions", () => ({
	deleteOrder: vi.fn()
}));

vi.mock("@/lib/contexts", () => ({
	useToastContext: vi.fn()
}));

const setUp = async values => {
	const orders = values?.orders || [];
	getOrdersByClientId.mockReturnValue(orders);
	const toastContext = values?.toastContext || createToastContext();
	useToastContext.mockReturnValue(toastContext);
	const cookie = values?.cookie || null;
	cookies.mockReturnValue({get: vi.fn(() => cookie)});
	const utils = render(await MyOrders());

	return {...utils, orders, toastContext};
};

describe("table of orders", () => {
	it("renders orders when there is a client id in cookies", async () => {
		const {orders} = await setUp({
			orders: [createOrder()],
			cookie: {value: "clientId"}
		});

		expect(getOrdersByClientId).toHaveBeenCalledOnce();

		const orderTableRows = screen.getAllByTestId(/order-table-row/);
		expect(orderTableRows).toHaveLength(orders.length);
		orders.forEach(order => {
			const orderTableRow = screen.getByTestId(`order-table-row-${order.id}`);
			expect(orderTableRow).toBeInTheDocument();
			const deleteOrderButton = within(orderTableRow).getByRole("button", {
				name: /delete/i
			});
			expect(deleteOrderButton).toBeInTheDocument();
			expect(deleteOrderButton).toHaveAttribute("type", "submit");
		});
	});

	it("renders fallback text when there is no client id in cookies", async () => {
		await setUp({cookie: null});

		const fallbackText = screen.getByText("You don't have any orders yet");
		expect(fallbackText).toBeInTheDocument();
	});

	it("renders fallback text when there are no orders", async () => {
		await setUp({orders: [], cookie: {value: "clientId"}});

		expect(getOrdersByClientId).toHaveBeenCalledOnce();
		const fallbackText = screen.getByText("You don't have any orders yet");
		expect(fallbackText).toBeInTheDocument();
	});

	it("deletes order when the delete order button is clicked", async () => {
		const orderId = 1;
		const {toastContext} = await setUp({
			orders: [createOrder(orderId)],
			cookie: {value: "clientId"}
		});

		const button = screen.getByRole("button", {name: /delete/i});
		fireEvent.click(button);

		await waitFor(() => {
			expect(deleteOrder).toHaveBeenCalledWith(orderId);
			expect(toastContext.showToast).toHaveBeenCalledWith(
				"success",
				"Your order have been deleted"
			);
		});
	});
});
