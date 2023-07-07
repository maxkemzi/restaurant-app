import {render, fireEvent} from "@testing-library/react";
import CheckboxField from "@/components/CheckboxField";
import {describe, expect, it, vi} from "vitest";

describe("CheckboxField", () => {
	const label = "Check me";

	it("renders checkbox with label and checked", () => {
		const {getByLabelText} = render(<CheckboxField label={label} checked />);
		const checkbox = getByLabelText(label);

		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toBeChecked();
	});

	it("renders checkbox with variant 'success'", () => {
		const {getByLabelText} = render(
			<CheckboxField label={label} variant="success" />
		);
		const checkbox = getByLabelText(label);

		expect(checkbox).toHaveClass("checkbox-success");
	});

	it("renders checkbox with variant 'error'", () => {
		const {getByLabelText} = render(
			<CheckboxField label={label} variant="error" />
		);
		const checkbox = getByLabelText(label);

		expect(checkbox).toHaveClass("checkbox-error");
	});

	it("calls onChange handler when checkbox is clicked", () => {
		const handleChange = vi.fn();
		const {getByLabelText} = render(
			<CheckboxField label={label} onChange={handleChange} />
		);
		const checkbox = getByLabelText(label);

		fireEvent.click(checkbox);
		expect(handleChange).toHaveBeenCalledTimes(1);
	});
});
