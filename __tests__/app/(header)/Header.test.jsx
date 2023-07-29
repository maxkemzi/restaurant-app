import {createCategory} from "@/__tests__/utils";
import Header from "@/src/app/(header)/Header";
import {PathName} from "@/src/lib/constants";
import {useCartContext} from "@/src/lib/contexts";
import {getCategories} from "@/src/lib/prisma/categories";
import {fireEvent, render, screen, within} from "@testing-library/react";
import mockRouter from "next-router-mock";
import {MemoryRouterProvider} from "next-router-mock/MemoryRouterProvider";
import {expect, it, vi} from "vitest";
import {createCartContext} from "../utils";

vi.mock("@/src/lib/prisma/categories", () => ({
	getCategories: vi.fn()
}));

vi.mock("@/src/lib/contexts", () => ({
	useCartContext: vi.fn()
}));

const setUp = async values => {
	const categories = values?.categories || [];
	getCategories.mockResolvedValue(categories);
	const cartContext = createCartContext();
	useCartContext.mockReturnValue(cartContext);
	const utils = render(await Header(), {wrapper: values?.wrapper});

	return {...utils, cartContext, categories};
};

it("renders menu", async () => {
	const {categories} = await setUp({categories: [createCategory()]});

	const menu = screen.getByTestId("menu");
	expect(menu).toBeInTheDocument();
	const homeMenuItem = within(menu).getByTestId("menu-item-home");
	expect(homeMenuItem).toBeInTheDocument();
	const allMenuItem = within(menu).getByTestId("menu-item-all");
	expect(allMenuItem).toBeInTheDocument();
	const categoryMenuItems = within(menu).getAllByTestId(/menu-item-category/);
	expect(categoryMenuItems).toHaveLength(categories.length);
	categories.forEach(({id}) => {
		const menuItem = within(menu).getByTestId(`menu-item-category-${id}`);
		expect(menuItem).toBeInTheDocument();
	});
});

it("renders mobile menu", async () => {
	const {categories} = await setUp({categories: [createCategory()]});

	const mobileMenu = screen.getByTestId("mobile-menu");
	expect(mobileMenu).toBeInTheDocument();
	const homeMenuItem = within(mobileMenu).getByTestId("menu-item-home");
	expect(homeMenuItem).toBeInTheDocument();
	const allMenuItem = within(mobileMenu).getByTestId("menu-item-all");
	expect(allMenuItem).toBeInTheDocument();
	const categoryMenuItems =
		within(mobileMenu).getAllByTestId(/menu-item-category/);
	expect(categoryMenuItems).toHaveLength(categories.length);
	categories.forEach(({id}) => {
		const menuItem = within(mobileMenu).getByTestId(`menu-item-category-${id}`);
		expect(menuItem).toBeInTheDocument();
	});
});

it("renders logo and my orders link", async () => {
	await setUp();

	const logo = screen.getByTestId("logo");
	expect(logo).toBeInTheDocument();
	const link = screen.getByRole("link", {name: /my orders/i});
	expect(link).toBeInTheDocument();
});

it("renders cart dropdown", async () => {
	const {cartContext} = await setUp();

	const iconCount = screen.getByTestId("iconCount");
	expect(iconCount).toBeInTheDocument();
	expect(iconCount).toHaveTextContent(cartContext.totalCount);
	const menuCount = screen.getByText(
		new RegExp(`${cartContext.totalCount} Items`, "i")
	);
	expect(menuCount).toBeInTheDocument();
	const totalCost = screen.getByText(
		new RegExp(`Total: \\$${cartContext.totalCost}`, "i")
	);
	expect(totalCost).toBeInTheDocument();
});

it("navigates to my orders path when my orders link is clicked", async () => {
	await setUp({wrapper: MemoryRouterProvider});

	const link = screen.getByRole("link", {name: /my orders/i});
	fireEvent.click(link);

	expect(mockRouter.asPath).toEqual(PathName.MY_ORDERS);
});

it("navigates to the cart path when view cart link is clicked", async () => {
	await setUp({wrapper: MemoryRouterProvider});

	const link = screen.getByRole("link", {name: /view cart/i});
	fireEvent.click(link);

	expect(mockRouter.asPath).toBe(PathName.CART);
});
