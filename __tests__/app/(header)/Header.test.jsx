import {createCategory} from "@/__tests__/utils";
import Header from "@/app/(header)/Header";
import {PathName} from "@/lib/constants";
import {useCartContext} from "@/lib/contexts";
import {getCategories} from "@/lib/prisma/categories";
import {fireEvent, render, screen, within} from "@testing-library/react";
import mockRouter from "next-router-mock";
import {MemoryRouterProvider} from "next-router-mock/MemoryRouterProvider";
import {describe, expect, it, vi} from "vitest";
import {createCartContext} from "../utils";

vi.mock("@/lib/prisma/categories", () => ({
	getCategories: vi.fn()
}));

vi.mock("@/lib/contexts", () => ({
	useCartContext: vi.fn()
}));

vi.mock("@/components/ui/Menu", () => ({
	default: ({children}) => <div data-testid="Menu">{children}</div>
}));

vi.mock("@/components/ui/MobileMenu", () => ({
	default: ({children}) => <div data-testid="MobileMenu">{children}</div>
}));

vi.mock("@/components/ui/MenuItem", () => ({
	default: () => <div data-testid="MenuItem" />
}));

vi.mock("@/components/Logo", () => ({
	default: () => <div data-testid="Logo" />
}));

describe("Header", () => {
	describe("renders header", () => {
		it("renders menus", async () => {
			const categories = [createCategory()];
			getCategories.mockResolvedValue(categories);
			const cartContext = createCartContext();
			useCartContext.mockReturnValue(cartContext);

			render(await Header());

			const defaultMenuItemsCount = 2;

			const menu = screen.getByTestId("Menu");
			const menuItems = within(menu).getAllByTestId("MenuItem");
			expect(menuItems).toHaveLength(defaultMenuItemsCount + categories.length);

			const mobileMenu = screen.getByTestId("MobileMenu");
			const mobileMenuItems = within(mobileMenu).getAllByTestId("MenuItem");
			expect(mobileMenuItems).toHaveLength(
				defaultMenuItemsCount + categories.length
			);
		});

		it("renders logo and my orders link", async () => {
			const categories = [];
			getCategories.mockResolvedValue(categories);
			const cartContext = createCartContext();
			useCartContext.mockReturnValue(cartContext);

			render(await Header());

			const logo = screen.getByTestId("Logo");
			expect(logo).toBeInTheDocument();

			const link = screen.getByRole("link", {name: /my orders/i});
			expect(link).toBeInTheDocument();
		});

		it("renders cart dropdown", async () => {
			const categories = [];
			getCategories.mockResolvedValue(categories);
			const cartContext = createCartContext();
			useCartContext.mockReturnValue(cartContext);

			render(await Header());

			const iconCount = screen.getByTestId("iconCount");
			expect(iconCount).toBeInTheDocument();
			expect(iconCount).toHaveTextContent(cartContext.cart.count);

			const menuCount = screen.getByText(
				new RegExp(`${cartContext.cart.count} Items`, "i")
			);
			expect(menuCount).toBeInTheDocument();

			const totalCost = screen.getByText(
				new RegExp(`Total: \\$${cartContext.cart.cost}`, "i")
			);
			expect(totalCost).toBeInTheDocument();
		});
	});

	it("navigates to my orders path when my orders link is clicked", async () => {
		const categories = [createCategory()];
		getCategories.mockResolvedValue(categories);
		const cartContext = createCartContext();
		useCartContext.mockReturnValue(cartContext);

		render(await Header(), {wrapper: MemoryRouterProvider});

		const link = screen.getByRole("link", {name: /my orders/i});
		fireEvent.click(link);

		expect(mockRouter.asPath).toEqual(PathName.MY_ORDERS);
	});

	it("navigates to the cart path when view cart link is clicked", async () => {
		const categories = [];
		getCategories.mockResolvedValue(categories);
		const cartContext = createCartContext();
		useCartContext.mockReturnValue(cartContext);

		render(await Header(), {wrapper: MemoryRouterProvider});

		const link = screen.getByRole("link", {name: /view cart/i});
		fireEvent.click(link);

		expect(mockRouter.asPath).toEqual(PathName.CART);
	});
});
