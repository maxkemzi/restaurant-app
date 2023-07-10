import Home from "@/app/page";
import {PathName, RestaurantInfo} from "@/lib/constants";
import {render, fireEvent} from "@testing-library/react";
import mockRouter from "next-router-mock";
import {MemoryRouterProvider} from "next-router-mock/MemoryRouterProvider";
import {describe, expect, it} from "vitest";

describe("Home", () => {
	it("renders home page", () => {
		const {getByRole, getByText} = render(<Home />);

		const heading = getByRole("heading", {
			name: new RegExp(RestaurantInfo.NAME, "i")
		});
		expect(heading).toBeInTheDocument();

		const subtitle = getByText(new RegExp(RestaurantInfo.SLOGAN, "i"));
		expect(subtitle).toBeInTheDocument();

		const link = getByRole("link", {name: /get started/i});
		expect(link).toBeInTheDocument();
	});

	it("navigates to the /products path when link is clicked", () => {
		const {getByRole} = render(<Home />, {
			wrapper: MemoryRouterProvider
		});

		const link = getByRole("link");
		fireEvent.click(link);

		expect(mockRouter.asPath).toEqual(PathName.PRODUCTS);
	});
});
