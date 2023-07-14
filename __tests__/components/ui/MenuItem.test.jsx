import MenuItem from "@/components/ui/MenuItem";
import {fireEvent, render, screen} from "@testing-library/react";
import mockRouter from "next-router-mock";
import {MemoryRouterProvider} from "next-router-mock/MemoryRouterProvider";
import {expect, it} from "vitest";

it("renders menu item with text and path", () => {
	const text = "Menu item";
	const path = "/path";
	render(<MenuItem text={text} path={path} />);

	const link = screen.getByRole("link", {name: text});
	expect(link).toBeInTheDocument();
	expect(link).toHaveAttribute("href", path);
});

it("navigates to the correct path when the link is clicked", () => {
	const text = "Menu item";
	const path = "/path";
	render(<MenuItem path={path} text={text} />, {
		wrapper: MemoryRouterProvider
	});

	const link = screen.getByRole("link", {name: text});
	fireEvent.click(link);

	expect(mockRouter.asPath).toBe(path);
});
