import Logo from "@/components/Logo";
import {PathName, RestaurantInfo} from "@/lib/constants";
import {fireEvent, render, screen} from "@testing-library/react";
import mockRouter from "next-router-mock";
import {MemoryRouterProvider} from "next-router-mock/MemoryRouterProvider";
import {expect, it} from "vitest";

it("renders logo link", () => {
	render(<Logo />);

	const link = screen.getByRole("link", {
		name: new RegExp(RestaurantInfo.NAME, "i")
	});
	expect(link).toBeInTheDocument();
});

it("navigates to the home path when the link is clicked", () => {
	render(<Logo />, {wrapper: MemoryRouterProvider});

	const link = screen.getByRole("link", {
		name: new RegExp(RestaurantInfo.NAME, "i")
	});
	fireEvent.click(link);

	expect(mockRouter.asPath).toBe(PathName.HOME);
});
