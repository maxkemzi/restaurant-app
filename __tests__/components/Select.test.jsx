import {render, fireEvent} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import Select from "@/components/Select";
import SelectOption from "@/components/SelectOption";

describe("Select", () => {
	const options = [
		{id: 1, text: "Option 1", value: "value 1"},
		{id: 2, text: "Option 2", value: "value 2"}
	];

	const defaultValue = options[0].value;

	it("renders select with children and default value", () => {
		const {getByText, getByRole} = render(
			<Select value={defaultValue}>
				{options.map(option => (
					<SelectOption key={option.id} value={option.value}>
						{option.text}
					</SelectOption>
				))}
			</Select>
		);
		const select = getByRole("combobox");

		expect(select).toBeInTheDocument();
		expect(select).toHaveValue(defaultValue);
		expect(select).toContainElement(getByText(options[0].text));
		expect(select).toContainElement(getByText(options[1].text));
	});

	it("calls onChange handler when select value changes", () => {
		const handleChange = vi.fn();
		const {getByRole} = render(
			<Select onChange={handleChange}>
				{options.map(option => (
					<SelectOption key={option.id} value={option.value}>
						{option.text}
					</SelectOption>
				))}
			</Select>
		);
		const select = getByRole("combobox");

		fireEvent.change(select);
		expect(handleChange).toHaveBeenCalledTimes(1);
	});
});
