import CartDropdown from "@/app/(header)/CartDropdown";
import {PathName} from "@/lib/constants";
import {useCartContext} from "@/lib/contexts";
import {fireEvent, render, screen} from "@testing-library/react";
import mockRouter from "next-router-mock";
import {MemoryRouterProvider} from "next-router-mock/MemoryRouterProvider";
import {describe, expect, it, vi} from "vitest";
import {createCartContext} from "../utils";

vi.mock("@/lib/contexts", () => ({
	useCartContext: vi.fn()
}));

describe("CartDropdown", () => {
	it("renders cart products count and total cost", () => {
		const cartContext = createCartContext();
		useCartContext.mockReturnValue(cartContext);

		render(<CartDropdown />);

		const iconCount = screen.getByTestId("iconCount");
		expect(iconCount).toHaveTextContent(cartContext.cart.count);

		const menuCount = screen.getByTestId("menuCount");
		expect(menuCount).toHaveTextContent(
			new RegExp(`${cartContext.cart.count} Items`, "i")
		);

		const totalCost = screen.getByTestId("totalCost");
		expect(totalCost).toHaveTextContent(
			new RegExp(`Total: \\$${cartContext.cart.cost}`, "i")
		);
	});

	it("navigates to the cart path when link is clicked", () => {
		const cartContext = createCartContext();
		useCartContext.mockReturnValue(cartContext);

		render(<CartDropdown />, {wrapper: MemoryRouterProvider});

		const link = screen.getByRole("link", {name: /view cart/i});
		fireEvent.click(link);

		expect(mockRouter.asPath).toEqual(PathName.CART);
	});
});
