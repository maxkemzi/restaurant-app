import Logo from "@/app/(header)/Logo";
import {PathName, RestaurantInfo} from "@/lib/constants";
import {fireEvent, render, screen} from "@testing-library/react";
import mockRouter from "next-router-mock";
import {MemoryRouterProvider} from "next-router-mock/MemoryRouterProvider";
import {describe, expect, it} from "vitest";

describe("Logo", () => {
	it("renders logo", () => {
		render(<Logo />);

		const link = screen.getByRole("link", {
			name: new RegExp(RestaurantInfo.NAME, "i")
		});
		expect(link).toBeInTheDocument();
	});

	it("navigates to the home path when link is clicked", () => {
		render(<Logo />, {wrapper: MemoryRouterProvider});

		const link = screen.getByRole("link", {
			name: new RegExp(RestaurantInfo.NAME, "i")
		});
		fireEvent.click(link);

		expect(mockRouter.asPath).toBe(PathName.HOME);
	});
});
