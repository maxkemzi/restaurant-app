import {render} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import MobileMenuDropdown from "@/components/MobileMenuDropdown";

describe("MobileMenuDropdown", () => {
	it("renders mobile menu dropdown with text and children", () => {
		const {getByText, getByRole} = render(
			<MobileMenuDropdown text="Menu">
				<li>Option 1</li>
				<li>Option 2</li>
			</MobileMenuDropdown>
		);
		const menuButton = getByText("Menu");
		const dropdownList = getByRole("list");

		expect(menuButton).toBeInTheDocument();
		expect(dropdownList).toBeInTheDocument();
		expect(dropdownList).toContainElement(getByText("Option 1"));
		expect(dropdownList).toContainElement(getByText("Option 2"));
	});
});
