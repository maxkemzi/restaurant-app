import Home from "@/app/page";
import {PathName, RestaurantInfo} from "@/lib/constants";
import {fireEvent, render, screen} from "@testing-library/react";
import mockRouter from "next-router-mock";
import {MemoryRouterProvider} from "next-router-mock/MemoryRouterProvider";
import {describe, expect, it, vi} from "vitest";
import {createError} from "../utils";

vi.mock("@/lib/contexts", () => ({
	useToastContext: vi.fn()
}));

vi.mock("@/app/page");

vi.mock("@/app/error", () => ({
	default: () => <div data-testid="Error" />
}));

describe("Home", () => {
	it("renders home page", () => {
		render(<Home />);

		const heading = screen.getByRole("heading", {
			name: new RegExp(RestaurantInfo.NAME, "i")
		});
		expect(heading).toBeInTheDocument();
		const subtitle = screen.getByText(new RegExp(RestaurantInfo.SLOGAN, "i"));
		expect(subtitle).toBeInTheDocument();
		const link = screen.getByRole("link", {name: /get started/i});
		expect(link).toBeInTheDocument();
	});

	it("navigates to the /products path when link is clicked", () => {
		render(<Home />, {wrapper: MemoryRouterProvider});

		const link = screen.getByRole("link", {name: /get started/i});
		fireEvent.click(link);

		expect(mockRouter.asPath).toEqual(PathName.PRODUCTS);
	});

	it("renders fallback component in case of an error", () => {
		const error = createError();
		Home.mockImplementation(() => {
			throw error;
		});

		expect(() => {
			render(<Home />);

			const fallback = screen.getByTestId("Error");
			expect(fallback).toBeInTheDocument();
		}).toThrow();
	});
});
