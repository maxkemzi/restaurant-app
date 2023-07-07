import SelectOption from "@/components/SelectOption";
import {render} from "@testing-library/react";
import {describe, expect, it} from "vitest";

describe("SelectOption", () => {
	const text = "Option 1";
	const value = "value 1";

	it("renders select option with children and value", () => {
		const {getByText} = render(
			<SelectOption value={value}>{text}</SelectOption>
		);
		const option = getByText(text);

		expect(option).toBeInTheDocument();
		expect(option).toHaveValue(value);
	});
});
