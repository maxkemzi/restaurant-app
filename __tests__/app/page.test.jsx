import Home from "@/src/app/page";
import {PathName, RestaurantInfo} from "@/src/lib/constants";
import {fireEvent, render, screen} from "@testing-library/react";
import mockRouter from "next-router-mock";
import {MemoryRouterProvider} from "next-router-mock/MemoryRouterProvider";
import {expect, it} from "vitest";

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

	expect(mockRouter.asPath).toBe(PathName.PRODUCTS);
});
