import Logo from "@/app/(header)/Logo";
import {PathName, RestaurantInfo} from "@/lib/constants";
import {fireEvent, render} from "@testing-library/react";
import mockRouter from "next-router-mock";
import {MemoryRouterProvider} from "next-router-mock/MemoryRouterProvider";
import {describe, expect, it} from "vitest";

describe("Logo", () => {
	it("renders Logo component", () => {
		const {getByRole} = render(<Logo />);

		const link = getByRole("link", {
			name: new RegExp(RestaurantInfo.NAME, "i")
		});
		expect(link).toBeInTheDocument();
	});

	it("navigates to the home path when link is clicked", () => {
		const {getByRole} = render(<Logo />, {
			wrapper: MemoryRouterProvider
		});

		const link = getByRole("link", {
			name: new RegExp(RestaurantInfo.NAME, "i")
		});
		fireEvent.click(link);

		expect(mockRouter.asPath).toEqual(PathName.HOME);
	});
});
