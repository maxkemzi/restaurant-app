import ErrorComponent from "@/app/error";
import {useToastContext} from "@/lib/contexts";
import {fireEvent, render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import {createAppError, createError} from "../utils";
import {createToastContext} from "./utils";

vi.mock("@/lib/contexts", () => ({
	useToastContext: vi.fn()
}));

describe("Error", () => {
	it("renders fallback component", () => {
		const error = createError();
		const reset = vi.fn();
		const toastContext = createToastContext();
		useToastContext.mockReturnValue(toastContext);

		render(<ErrorComponent error={error} reset={reset} />);

		const errorMessage = screen.getByText(
			new RegExp(`Error: ${error.message}`, "i")
		);
		expect(errorMessage).toBeInTheDocument();

		const resetButton = screen.getByRole("button", /try again/i);
		expect(resetButton).toBeInTheDocument();
	});

	it("resets error when the reset button is clicked", () => {
		const error = createError();
		const reset = vi.fn();
		const toastContext = createToastContext();
		useToastContext.mockReturnValue(toastContext);

		render(<ErrorComponent error={error} reset={reset} />);

		const resetButton = screen.getByRole("button", /try again/i);
		fireEvent.click(resetButton);

		expect(reset).toHaveBeenCalledOnce();
	});

	it("shows error toast with specified error message if error is instance of AppError", () => {
		const error = createAppError("Unexpected error.");
		const reset = vi.fn();
		const toastContext = createToastContext();
		useToastContext.mockReturnValue(toastContext);

		render(<ErrorComponent error={error} reset={reset} />);

		expect(toastContext.showToast).toHaveBeenCalledOnce();
		expect(toastContext.showToast).toHaveBeenCalledWith("error", error.message);
	});

	it("shows error toast with fallback error message if error is not instance of AppError", () => {
		const error = createError();
		const reset = vi.fn();
		const toastContext = createToastContext();
		useToastContext.mockReturnValue(toastContext);

		render(<ErrorComponent error={error} reset={reset} />);

		expect(toastContext.showToast).toHaveBeenCalledOnce();
		expect(toastContext.showToast).toHaveBeenCalledWith(
			"error",
			"Something went wrong."
		);
	});
});
