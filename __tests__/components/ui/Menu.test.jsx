import {render, screen, within} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import Menu from "@/components/ui/Menu";

describe("Menu", () => {
	it("renders menu with children", () => {
		const childText = "Child";

		render(
			<Menu>
				<li>{childText}</li>
			</Menu>
		);

		const menu = screen.getByRole("list");
		const child = within(menu).getByText(childText);

		expect(menu).toBeInTheDocument();
		expect(child).toBeInTheDocument();
	});
});
