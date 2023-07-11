import {createCategory} from "@/__tests__/utils";
import Header from "@/app/(header)/Header";
import {PathName} from "@/lib/constants";
import {getCategories} from "@/lib/prisma/categories";
import {fireEvent, render, screen, within} from "@testing-library/react";
import mockRouter from "next-router-mock";
import {MemoryRouterProvider} from "next-router-mock/MemoryRouterProvider";
import {describe, expect, it, vi} from "vitest";

vi.mock("@/lib/prisma/categories", () => ({
	getCategories: vi.fn()
}));

vi.mock("@/components/Menu", () => ({
	default: ({children}) => <div data-testid="Menu">{children}</div>
}));

vi.mock("@/components/MobileMenu", () => ({
	default: ({children}) => <div data-testid="MobileMenu">{children}</div>
}));

vi.mock("@/components/MenuItem", () => ({
	default: () => <div data-testid="MenuItem" />
}));

vi.mock("@/app/(header)/Logo", () => ({
	default: () => <div data-testid="Logo" />
}));

vi.mock("@/app/(header)/CartDropdown", () => ({
	default: () => <div data-testid="CartDropdown" />
}));

describe("Header", () => {
	it("renders header", async () => {
		const categories = [createCategory()];
		getCategories.mockResolvedValue(categories);

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

		const logo = screen.getByTestId("Logo");
		expect(logo).toBeInTheDocument();

		const cartDropdown = screen.getByTestId("CartDropdown");
		expect(cartDropdown).toBeInTheDocument();

		const link = screen.getByRole("link", {name: /my orders/i});
		expect(link).toBeInTheDocument();
	});

	it("navigates to my orders path when link is clicked", async () => {
		const categories = [createCategory()];
		getCategories.mockResolvedValue(categories);

		render(await Header(), {wrapper: MemoryRouterProvider});

		const link = screen.getByRole("link", {name: /my orders/i});
		fireEvent.click(link);

		expect(mockRouter.asPath).toEqual(PathName.MY_ORDERS);
	});
});
