import {render, screen, within} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import MobileMenu from "@/components/ui/MobileMenu";

describe("MobileMenu", () => {
	it("renders mobile menu with children", () => {
		const childText = "Child";

		render(
			<MobileMenu>
				<li>{childText}</li>
			</MobileMenu>
		);

		const menu = screen.getByRole("list");
		const child = within(menu).getByText(childText);

		expect(menu).toBeInTheDocument();
		expect(child).toBeInTheDocument();
	});
});
