import MobileMenu from "@/src/components/ui/MobileMenu";
import {render, screen, within} from "@testing-library/react";
import {expect, it} from "vitest";

it("renders mobile menu with children", () => {
	const childText = "Child";
	render(
		<MobileMenu>
			<li>{childText}</li>
		</MobileMenu>
	);

	const menu = screen.getByRole("list");
	expect(menu).toBeInTheDocument();
	const child = within(menu).getByText(childText);
	expect(child).toBeInTheDocument();
});
