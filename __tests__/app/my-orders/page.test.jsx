import {deleteOrder} from "@/app/my-orders/actions";
import MyOrders from "@/app/my-orders/page";
import {useToastContext} from "@/lib/contexts";
import {getOrdersByClientId} from "@/lib/prisma/orders";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
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

vi.mock("@/components/OrderTableRow", () => ({
	default: ({actionsSlot}) => (
		<div data-testid="OrderTableRow">{actionsSlot}</div>
	)
}));

describe("MyOrders", () => {
	describe("orders table", () => {
		it("renders orders when there is a client id in cookies", async () => {
			const orders = [createOrder()];
			getOrdersByClientId.mockReturnValue(orders);
			const toastContext = createToastContext();
			useToastContext.mockReturnValue(toastContext);
			cookies.mockReturnValue({get: () => ({value: "clientId"})});

			render(await MyOrders());

			expect(getOrdersByClientId).toHaveBeenCalledOnce();
			const orderTableRows = screen.getAllByTestId("OrderTableRow");
			expect(orderTableRows).toHaveLength(orders.length);
		});

		it("renders fallback text when there is no client id in cookies", async () => {
			const toastContext = createToastContext();
			useToastContext.mockReturnValue(toastContext);
			cookies.mockReturnValue({get: () => ({})});

			render(await MyOrders());

			expect(getOrdersByClientId).not.toHaveBeenCalled();
			const fallbackText = screen.getByText("You don't have any orders yet");
			expect(fallbackText).toBeInTheDocument();
		});

		it("renders fallback text when there are no orders", async () => {
			const orders = [];
			getOrdersByClientId.mockReturnValue(orders);
			const toastContext = createToastContext();
			useToastContext.mockReturnValue(toastContext);
			cookies.mockReturnValue({get: () => ({value: "clientId"})});

			render(await MyOrders());

			expect(getOrdersByClientId).toHaveBeenCalledOnce();
			const fallbackText = screen.getByText("You don't have any orders yet");
			expect(fallbackText).toBeInTheDocument();
		});
	});

	describe("delete order button", () => {
		it("renders button for the order table row", async () => {
			const orders = [createOrder()];
			getOrdersByClientId.mockReturnValue(orders);
			const toastContext = createToastContext();
			useToastContext.mockReturnValue(toastContext);
			cookies.mockReturnValue({get: () => ({value: "clientId"})});

			render(await MyOrders());

			const button = screen.getByRole("button", {name: /delete/i});
			expect(button).toBeInTheDocument();
			expect(button).toHaveAttribute("type", "submit");
		});

		it("successfully deletes order", async () => {
			const orderId = 1;
			const orders = [createOrder(orderId)];
			getOrdersByClientId.mockReturnValue(orders);
			const toastContext = createToastContext();
			useToastContext.mockReturnValue(toastContext);
			cookies.mockReturnValue({get: () => ({value: "clientId"})});

			render(await MyOrders());

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
});
