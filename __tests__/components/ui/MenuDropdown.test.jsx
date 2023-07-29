import MenuDropdown from "@/src/components/ui/MenuDropdown";
import {render, screen, within} from "@testing-library/react";
import {expect, it} from "vitest";

it("renders menu dropdown with text and children", () => {
	const childText = "Child";
	const dropdownText = "Menu";
	render(
		<MenuDropdown text={dropdownText}>
			<li>{childText}</li>
		</MenuDropdown>
	);

	const button = screen.getByText(dropdownText);
	expect(button).toBeInTheDocument();
	const list = screen.getByRole("list");
	expect(list).toBeInTheDocument();
	const child = within(list).getByText(childText);
	expect(child).toBeInTheDocument();
});
