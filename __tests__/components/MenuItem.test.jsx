import MenuItem from "@/components/MenuItem";
import {fireEvent, render} from "@testing-library/react";
import mockRouter from "next-router-mock";
import {MemoryRouterProvider} from "next-router-mock/MemoryRouterProvider";
import {describe, expect, it} from "vitest";

describe("MenuItem", () => {
	const text = "Products";
	const path = "/products";

	it("renders menu item with text and path", () => {
		const {getByText, getByRole} = render(<MenuItem text={text} path={path} />);
		const item = getByRole("listitem");
		const itemLink = getByText(text);

		expect(item).toBeInTheDocument();
		expect(itemLink).toBeInTheDocument();
		expect(itemLink).toHaveAttribute("href", path);
	});

	it("navigates to the correct page when the link is clicked", () => {
		const {getByText} = render(<MenuItem path={path} text={text} />, {
			wrapper: MemoryRouterProvider
		});

		const link = getByText(text);

		fireEvent.click(link);
		expect(mockRouter.asPath).toEqual(path);
	});
});
