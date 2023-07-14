import Menu from "@/components/ui/Menu";
import {render, screen, within} from "@testing-library/react";
import {expect, it} from "vitest";

it("renders menu with children", () => {
	const childText = "Child";
	render(
		<Menu>
			<li>{childText}</li>
		</Menu>
	);

	const menu = screen.getByRole("list");
	expect(menu).toBeInTheDocument();
	const child = within(menu).getByText(childText);
	expect(child).toBeInTheDocument();
});
