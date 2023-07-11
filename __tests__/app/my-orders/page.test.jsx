import MyOrders from "@/app/my-orders/page";
import {getOrdersByClientId} from "@/lib/prisma/orders";
import {render, screen} from "@testing-library/react";
import {cookies} from "next/headers";
import {describe, expect, it, vi} from "vitest";
import {createOrder} from "../../utils";

vi.mock("next/headers", () => ({
	cookies: vi.fn()
}));

vi.mock("@/lib/prisma/orders", () => ({
	getOrdersByClientId: vi.fn()
}));

vi.mock("@/app/my-orders/OrderTableRow", () => ({
	default: () => <div data-testid="OrderTableRow" />
}));

describe("MyOrders", () => {
	it("renders orders when there is a client id in cookies", async () => {
		const orders = [createOrder()];
		cookies.mockReturnValue({get: () => ({value: "clientId"})});
		getOrdersByClientId.mockReturnValue(orders);

		render(await MyOrders());

		expect(getOrdersByClientId).toHaveBeenCalledOnce();

		const orderTableRows = screen.getAllByTestId("OrderTableRow");
		expect(orderTableRows).toHaveLength(orders.length);
	});

	it("renders fallback text when there is no client id in cookies", async () => {
		cookies.mockReturnValue({get: () => ({})});

		render(await MyOrders());

		expect(getOrdersByClientId).not.toHaveBeenCalled();

		const fallbackText = screen.getByText("You don't have any orders yet");
		expect(fallbackText).toBeInTheDocument();
	});

	it("renders fallback text when there are no orders", async () => {
		const orders = [];
		cookies.mockReturnValue({get: () => ({value: "clientId"})});
		getOrdersByClientId.mockReturnValue(orders);

		render(await MyOrders());

		expect(getOrdersByClientId).toHaveBeenCalledOnce();

		const fallbackText = screen.getByText("You don't have any orders yet");
		expect(fallbackText).toBeInTheDocument();
	});
});
