import Select from "@/components/ui/Select";
import {fireEvent, render, screen, within} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";

describe("Select", () => {
	it("renders select with children and default value", () => {
		const value = "Value";
		const childText = "Child";

		render(
			<Select value={value}>
				<li>{childText}</li>
			</Select>
		);
		const select = screen.getByRole("combobox", {value});
		const child = within(select).getByText(childText);

		expect(select).toBeInTheDocument();
		expect(child).toBeInTheDocument();
	});

	it("calls onChange handler when select value changes", () => {
		const handleChange = vi.fn();

		render(<Select onChange={handleChange} />);
		const select = screen.getByRole("combobox");
		fireEvent.change(select);

		expect(handleChange).toHaveBeenCalledOnce();
	});
});
