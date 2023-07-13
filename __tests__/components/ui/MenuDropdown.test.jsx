import {render, screen, within} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import MenuDropdown from "@/components/ui/MenuDropdown";

describe("MenuDropdown", () => {
	it("renders menu dropdown with text and children", () => {
		const childText = "Child";
		const dropdownText = "Menu";

		render(
			<MenuDropdown text={dropdownText}>
				<li>{childText}</li>
			</MenuDropdown>
		);

		const button = screen.getByText(dropdownText);
		const list = screen.getByRole("list");
		const child = within(list).getByText(childText);

		expect(button).toBeInTheDocument();
		expect(list).toBeInTheDocument();
		expect(child).toBeInTheDocument();
	});
});
