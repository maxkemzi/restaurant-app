import SelectOption from "@/components/ui/SelectOption";
import {render, screen, within} from "@testing-library/react";
import {describe, expect, it} from "vitest";

describe("SelectOption", () => {
	it("renders select option with children and value", () => {
		const childText = "Option 1";
		const value = "Value";

		render(<SelectOption value={value}>{childText}</SelectOption>);
		const option = screen.getByRole("option", {value});
		const child = within(option).getByText(childText);

		expect(option).toBeInTheDocument();
		expect(child).toBeInTheDocument();
	});
});
