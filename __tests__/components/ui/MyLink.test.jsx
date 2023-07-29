import MyLink, {LinkSize} from "@/src/components/ui/MyLink";
import {fireEvent, render, screen} from "@testing-library/react";
import mockRouter from "next-router-mock";
import {MemoryRouterProvider} from "next-router-mock/MemoryRouterProvider";
import {expect, it, vi} from "vitest";

it("renders link with default props", () => {
	const text = "Click me";
	const path = "/path";
	render(<MyLink path={path}>{text}</MyLink>);

	const link = screen.getByRole("link", {name: text});
	expect(link).toBeInTheDocument();
	expect(link).toHaveAttribute("href", path);
	expect(link).toHaveClass("btn-md");
	expect(link).toHaveClass("btn-primary");
});

it("throws an error when rendering link without path prop", () => {
	const text = "Click me";
	const originalError = console.error;
	console.error = vi.fn();

	expect(() => {
		render(<MyLink>{text}</MyLink>);
	}).toThrow();

	console.error = originalError;
});

it("renders link with custom size", () => {
	const text = "Click me";
	const path = "/path";
	render(
		<MyLink path={path} size={LinkSize.SMALL}>
			{text}
		</MyLink>
	);

	const link = screen.getByRole("link", {name: text});
	expect(link).toHaveClass("btn-sm");
});

it("navigates to the correct path when the link is clicked", () => {
	const text = "Click me";
	const path = "/path";
	render(<MyLink path={path}>{text}</MyLink>, {
		wrapper: MemoryRouterProvider
	});

	const link = screen.getByRole("link", {name: text});
	fireEvent.click(link);

	expect(mockRouter.asPath).toBe(path);
});
