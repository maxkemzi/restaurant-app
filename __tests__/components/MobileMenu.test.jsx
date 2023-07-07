import {render} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import MobileMenu from "@/components/MobileMenu";

describe("MobileMenu", () => {
	it("renders mobile menu with children", () => {
		const {getByText, getByRole} = render(
			<MobileMenu>
				<li>Option 1</li>
				<li>Option 2</li>
			</MobileMenu>
		);
		const menuList = getByRole("list");

		expect(menuList).toBeInTheDocument();
		expect(menuList).toContainElement(getByText("Option 1"));
		expect(menuList).toContainElement(getByText("Option 2"));
	});
});
