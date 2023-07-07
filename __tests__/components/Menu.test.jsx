import {render} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import Menu from "@/components/Menu";

describe("Menu", () => {
	it("renders menu with children", () => {
		const {getByText, getByRole} = render(
			<Menu>
				<li>Option 1</li>
				<li>Option 2</li>
			</Menu>
		);
		const menuList = getByRole("list");

		expect(menuList).toBeInTheDocument();
		expect(menuList).toContainElement(getByText("Option 1"));
		expect(menuList).toContainElement(getByText("Option 2"));
	});
});
