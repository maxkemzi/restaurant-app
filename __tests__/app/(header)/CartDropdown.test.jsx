import CartDropdown from "@/app/(header)/CartDropdown";
import {PathName} from "@/lib/constants";
import {useCartContext} from "@/lib/contexts";
import {fireEvent, render, screen} from "@testing-library/react";
import mockRouter from "next-router-mock";
import {MemoryRouterProvider} from "next-router-mock/MemoryRouterProvider";
import {describe, expect, it, vi} from "vitest";

vi.mock("@/lib/contexts", () => ({
	useCartContext: vi.fn()
}));

describe("CartDropdown", () => {
	it("renders cart products count and total cost", () => {
		const cartMock = {count: 10, cost: 15};
		useCartContext.mockReturnValue({cart: cartMock});

		render(<CartDropdown />);

		const iconCount = screen.getByTestId("iconCount");
		expect(iconCount).toHaveTextContent(cartMock.count);

		const menuCount = screen.getByTestId("menuCount");
		expect(menuCount).toHaveTextContent(
			new RegExp(`${cartMock.count} Items`, "i")
		);

		const totalCost = screen.getByTestId("totalCost");
		expect(totalCost).toHaveTextContent(
			new RegExp(`Total: \\$${cartMock.cost}`, "i")
		);
	});

	it("navigates to the cart path when link is clicked", () => {
		const cartMock = {count: 10, cost: 15};
		useCartContext.mockReturnValue({cart: cartMock});

		render(<CartDropdown />, {wrapper: MemoryRouterProvider});

		const link = screen.getByRole("link", {name: /view cart/i});
		fireEvent.click(link);

		expect(mockRouter.asPath).toEqual(PathName.CART);
	});
});
