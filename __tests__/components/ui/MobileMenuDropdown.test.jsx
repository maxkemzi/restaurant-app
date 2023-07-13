import {render, screen, within} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import MobileMenuDropdown from "@/components/ui/MobileMenuDropdown";

describe("MobileMenuDropdown", () => {
	it("renders mobile menu dropdown with text and children", () => {
		const childText = "Child";
		const dropdownText = "Menu";

		render(
			<MobileMenuDropdown text={dropdownText}>
				<li>{childText}</li>
			</MobileMenuDropdown>
		);

		const button = screen.getByText(dropdownText);
		const list = screen.getByRole("list");
		const child = within(list).getByText(childText);

		expect(button).toBeInTheDocument();
		expect(list).toBeInTheDocument();
		expect(child).toBeInTheDocument();
	});
});
