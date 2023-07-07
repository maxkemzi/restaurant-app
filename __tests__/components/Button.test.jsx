import Button, {ButtonColor, ButtonSize} from "@/components/Button";
import {fireEvent, render} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";

describe("Button", () => {
	const text = "Click me";

	it("renders button with default props", () => {
		const {getByText} = render(<Button>{text}</Button>);
		const button = getByText(text);

		expect(button).toBeInTheDocument();
		expect(button).toHaveAttribute("type", "button");
		expect(button).toHaveClass("btn-md");
		expect(button).toHaveClass("btn-primary");
	});

	it("renders button with custom size", () => {
		const {getByText} = render(<Button size={ButtonSize.SMALL}>{text}</Button>);
		const button = getByText(text);

		expect(button).toHaveClass("btn-sm");
	});

	it("renders button with custom color", () => {
		const {getByText} = render(
			<Button color={ButtonColor.SUCCESS}>{text}</Button>
		);
		const button = getByText(text);

		expect(button).toHaveClass("btn-success");
	});

	it("renders button as submit type", () => {
		const {getByText} = render(<Button isSubmit>{text}</Button>);
		const button = getByText(text);

		expect(button).toHaveAttribute("type", "submit");
	});

	it("calls onClick handler when clicked", () => {
		const handleClick = vi.fn();
		const {getByText} = render(<Button onClick={handleClick}>{text}</Button>);
		const button = getByText(text);

		fireEvent.click(button);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
