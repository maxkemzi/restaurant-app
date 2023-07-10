import Header from "@/app/(header)/Header";
import {getCategories} from "@/lib/prisma/categories";
import {render, screen, within, fireEvent} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import mockRouter from "next-router-mock";
import {MemoryRouterProvider} from "next-router-mock/MemoryRouterProvider";
import {PathName} from "@/lib/constants";
import Logo from "@/app/(header)/Logo";
import CartDropdown from "@/app/(header)/CartDropdown";

vi.mock("@/lib/prisma/categories", () => ({
	getCategories: vi.fn()
}));

vi.mock("@/app/(header)/Logo");

vi.mock("@/app/(header)/CartDropdown");

vi.mock("@/components/Menu", () => ({
	default: ({children}) => <div data-testid="Menu">{children}</div>
}));

vi.mock("@/components/MobileMenu", () => ({
	default: ({children}) => <div data-testid="MobileMenu">{children}</div>
}));

vi.mock("@/components/MenuItem", () => ({
	default: () => <div data-testid="MenuItem" />
}));

describe("Header", () => {
	it("renders menus, logo, cart dropdown and link", async () => {
		const mockCategories = [
			{id: 1, name: "Category 1"},
			{id: 2, name: "Category 2"}
		];
		getCategories.mockResolvedValue(mockCategories);

		render(await Header());

		const menu = await screen.findByTestId("Menu");
		const menuItems = await within(menu).findAllByTestId("MenuItem");
		expect(menuItems).toHaveLength(2 + mockCategories.length);

		const mobileMenu = await screen.findByTestId("MobileMenu");
		const mobileMenuItems = await within(mobileMenu).findAllByTestId(
			"MenuItem"
		);
		expect(mobileMenuItems).toHaveLength(2 + mockCategories.length);

		expect(Logo).toHaveBeenCalled();
		expect(CartDropdown).toHaveBeenCalled();

		const link = await screen.getByRole("link", {name: /my orders/i});
		expect(link).toBeInTheDocument();
	});

	it("navigates to the my orders path when link is clicked", async () => {
		const mockCategories = [
			{id: 1, name: "Category 1"},
			{id: 2, name: "Category 2"}
		];
		getCategories.mockResolvedValue(mockCategories);

		render(await Header(), {wrapper: MemoryRouterProvider});

		const link = await screen.getByRole("link", {name: /my orders/i});
		fireEvent.click(link);

		expect(mockRouter.asPath).toEqual(PathName.MY_ORDERS);
	});
});
