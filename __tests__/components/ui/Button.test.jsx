import Button, {
	ButtonColor,
	ButtonSize,
	ButtonVariant
} from "@/components/ui/Button";
import {fireEvent, render, screen} from "@testing-library/react";
import {expect, it, vi} from "vitest";

it("renders button with default props", () => {
	const text = "Click me";
	render(<Button>{text}</Button>);

	const button = screen.getByRole("button", {name: text});
	expect(button).toBeInTheDocument();
	expect(button).toHaveAttribute("type", "button");
	expect(button).toHaveClass("btn-md");
	expect(button).toHaveClass("btn-primary");
	expect(button).not.toHaveClass("btn-circle");
});

it("renders button with custom size", () => {
	const text = "Click me";
	render(<Button size={ButtonSize.SMALL}>{text}</Button>);

	const button = screen.getByRole("button", {name: text});
	expect(button).toHaveClass("btn-sm");
});

it("renders button with custom color", () => {
	const text = "Click me";
	render(<Button color={ButtonColor.SUCCESS}>{text}</Button>);

	const button = screen.getByRole("button", {name: text});
	expect(button).toHaveClass("btn-success");
});

it("renders button with submit type", () => {
	const text = "Click me";
	render(<Button isSubmit>{text}</Button>);

	const button = screen.getByRole("button", {name: text});
	expect(button).toHaveAttribute("type", "submit");
});

it("renders button with circle variant", () => {
	const text = "Click me";
	render(<Button variant={ButtonVariant.CIRCLE}>{text}</Button>);

	const button = screen.getByRole("button", {name: text});
	expect(button).toHaveClass("btn-circle");
});

it("calls onClick handler when clicked", () => {
	const text = "Click me";
	const handleClick = vi.fn();
	render(<Button onClick={handleClick}>{text}</Button>);

	const button = screen.getByRole("button", {name: text});
	fireEvent.click(button);

	expect(handleClick).toHaveBeenCalledOnce();
});
