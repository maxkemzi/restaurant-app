import {render, fireEvent, screen} from "@testing-library/react";
import CheckboxField, {CheckboxVariant} from "@/components/ui/CheckboxField";
import {describe, expect, it, vi} from "vitest";

describe("CheckboxField", () => {
	it("renders checked checkbox with label", () => {
		const label = "Check me";

		render(<CheckboxField label={label} checked />);
		const checkbox = screen.getByLabelText(label);

		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toBeChecked();
	});

	it("renders checkbox with success variant", () => {
		const label = "Check me";

		render(<CheckboxField label={label} variant={CheckboxVariant.SUCCESS} />);
		const checkbox = screen.getByLabelText(label);

		expect(checkbox).toHaveClass("checkbox-success");
	});

	it("renders checkbox with error variant", () => {
		const label = "Check me";

		render(<CheckboxField label={label} variant={CheckboxVariant.ERROR} />);
		const checkbox = screen.getByLabelText(label);

		expect(checkbox).toHaveClass("checkbox-error");
	});

	it("calls onChange handler when checkbox is clicked", () => {
		const label = "Check me";
		const handleChange = vi.fn();

		render(<CheckboxField label={label} onChange={handleChange} />);
		const checkbox = screen.getByLabelText(label);
		fireEvent.click(checkbox);

		expect(handleChange).toHaveBeenCalledOnce();
	});
});
