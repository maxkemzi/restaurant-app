import MyLink, {LinkSize} from "@/components/MyLink";
import {fireEvent, render} from "@testing-library/react";
import mockRouter from "next-router-mock";
import {MemoryRouterProvider} from "next-router-mock/MemoryRouterProvider";
import {describe, expect, it, vi} from "vitest";

describe("MyLink", () => {
	const text = "Click me";
	const path = "/products";

	it("renders link with default props", () => {
		const {getByText} = render(<MyLink path={path}>{text}</MyLink>);
		const link = getByText(text);

		expect(link).toBeInTheDocument();
		expect(link).toHaveClass("btn-md");
		expect(link).toHaveClass("btn-primary");
		expect(link).toHaveAttribute("href", path);
	});

	it("throws an error when rendering link without path prop", () => {
		const originalError = console.error;
		console.error = vi.fn();

		expect(() => {
			render(<MyLink>{text}</MyLink>);
		}).toThrow();

		console.error = originalError;
	});

	it("renders link with custom size", () => {
		const {getByText} = render(
			<MyLink path={path} size={LinkSize.SMALL}>
				{text}
			</MyLink>
		);
		const link = getByText(text);

		expect(link).toHaveClass("btn-sm");
	});

	it("navigates to the correct page when the link is clicked", () => {
		const {getByText} = render(<MyLink path={path}>{text}</MyLink>, {
			wrapper: MemoryRouterProvider
		});

		const link = getByText(text);

		fireEvent.click(link);
		expect(mockRouter.asPath).toEqual(path);
	});
});
