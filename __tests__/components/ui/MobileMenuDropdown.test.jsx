import MobileMenuDropdown from "@/components/ui/MobileMenuDropdown";
import {render, screen, within} from "@testing-library/react";
import {expect, it} from "vitest";

it("renders mobile menu dropdown with text and children", () => {
	const childText = "Child";
	const dropdownText = "Menu";
	render(
		<MobileMenuDropdown text={dropdownText}>
			<li>{childText}</li>
		</MobileMenuDropdown>
	);

	const button = screen.getByText(dropdownText);
	expect(button).toBeInTheDocument();
	const list = screen.getByRole("list");
	expect(list).toBeInTheDocument();
	const child = within(list).getByText(childText);
	expect(child).toBeInTheDocument();
});
