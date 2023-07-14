import ParamSelect from "@/components/ParamSelect";
import {fireEvent, render, screen, within} from "@testing-library/react";
import mockRouter from "next-router-mock";
import {MemoryRouterProvider} from "next-router-mock/MemoryRouterProvider";
import {useSearchParams} from "next/navigation";
import {expect, it, vi} from "vitest";

vi.mock("next/navigation", () => ({
	...require("next-router-mock"),
	useSearchParams: vi.fn(),
	usePathname: vi.fn()
}));

const setUp = values => {
	const options = values?.options || [
		{id: 1, value: "option1", text: "Option 1"},
		{id: 2, value: "option2", text: "Option 2"}
	];
	const searchParams = values?.searchParams || new URLSearchParams();
	useSearchParams.mockReturnValue(searchParams);
	const utils = render(
		<ParamSelect
			defaultValue={values?.defaultValue}
			paramName={values?.paramName}
			testId="select">
			{options.map(option => (
				<option key={option.id} value={option.value}>
					{option.text}
				</option>
			))}
		</ParamSelect>,
		{wrapper: values?.wrapper}
	);

	return {...utils, options};
};

it("renders select with children and default value", () => {
	const options = [
		{id: 1, value: "option1", text: "Option 1"},
		{id: 2, value: "option2", text: "Option 2"}
	];
	const defaultValue = options[1].value;
	setUp({defaultValue, options});

	const select = screen.getByTestId("select");
	expect(select).toBeInTheDocument();
	expect(select).toHaveValue(defaultValue);

	const selectOptions = within(select).getAllByRole("option");
	expect(selectOptions).toHaveLength(options.length);
});

it("appends search param with the option value", () => {
	const paramName = "param";
	const {options} = setUp({paramName, wrapper: MemoryRouterProvider});
	const newParamValue = options[0].value;

	const select = screen.getByTestId("select");
	fireEvent.change(select, {target: {value: newParamValue}});

	expect(mockRouter.query).toHaveProperty(paramName, newParamValue);
});

it("removes search param if value is falsy", () => {
	const paramName = "param";
	const searchParams = new URLSearchParams(`${paramName}=some_value`);
	setUp({paramName, searchParams, wrapper: MemoryRouterProvider});
	mockRouter.push(`/?${searchParams.toString()}`);

	const select = screen.getByTestId("select");
	fireEvent.change(select, {target: {value: ""}});

	expect(mockRouter.query).not.toHaveProperty(paramName);
});
