import TextField from "@/components/ui/TextField";
import {fireEvent, render, screen} from "@testing-library/react";
import {expect, it, vi} from "vitest";

it("renders text field with label and input value", () => {
	const label = "Label";
	const InputProps = {defaultValue: "value"};
	render(<TextField label={label} InputProps={InputProps} />);

	const labelText = screen.getByLabelText(label);
	expect(labelText).toBeInTheDocument();
	const labelElement = screen.getByTestId("label");
	const input = screen.getByRole("textbox", {value: InputProps.defaultValue});
	expect(input).toBeInTheDocument();
	expect(input.id).toBe(labelElement.htmlFor);
});

it("renders text field with custom className", () => {
	const className = "custom-class";
	const {container} = render(<TextField className={className} />);

	const textField = container.firstChild;
	expect(textField).toHaveClass(className);
});

it("renders error text if it is provided", () => {
	const errorText = "error";
	render(<TextField error={errorText} />);

	const error = screen.getByText(errorText);
	expect(error).toBeInTheDocument();
});

it("doesn't render error text if it isn't provided", () => {
	render(<TextField />);

	const error = screen.queryByTestId("error");
	expect(error).not.toBeInTheDocument();
});

it("calls input onChange handler", () => {
	const initialValue = "initial value";
	const handleChange = vi.fn();
	render(
		<TextField InputProps={{onChange: handleChange, value: initialValue}} />
	);

	const input = screen.getByRole("textbox");
	fireEvent.change(input, {target: {value: "new value"}});

	expect(handleChange).toHaveBeenCalledOnce();
});
