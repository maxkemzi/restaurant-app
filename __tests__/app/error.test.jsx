import ErrorComponent from "@/src/app/error";
import {useToastContext} from "@/src/lib/contexts";
import {fireEvent, render, screen} from "@testing-library/react";
import {expect, it, vi} from "vitest";
import {createAppError} from "../utils";
import {createToastContext} from "./utils";

vi.mock("@/src/lib/contexts", () => ({
	useToastContext: vi.fn()
}));

const setUp = values => {
	const toastContext = values?.toastContext || createToastContext();
	useToastContext.mockReturnValue(toastContext);
	const error = values?.error || new Error("Some error.");
	const reset = vi.fn();
	const utils = render(<ErrorComponent error={error} reset={reset} />);

	return {...utils, reset, error, toastContext};
};

it("renders error message and reset button", () => {
	const {error} = setUp();

	const errorMessage = screen.getByText(
		new RegExp(`Error: ${error.message}`, "i")
	);
	expect(errorMessage).toBeInTheDocument();
	const resetButton = screen.getByRole("button", /try again/i);
	expect(resetButton).toBeInTheDocument();
});

it("resets error when the reset button is clicked", () => {
	const {reset} = setUp();

	const resetButton = screen.getByRole("button", /try again/i);
	fireEvent.click(resetButton);

	expect(reset).toHaveBeenCalledOnce();
});

it("shows error toast with specified error message if error is instance of AppError", () => {
	const {error, toastContext} = setUp({
		error: createAppError("Unexpected error.")
	});

	expect(toastContext.showToast).toHaveBeenCalledOnce();
	expect(toastContext.showToast).toHaveBeenCalledWith("error", error.message);
});

it("shows error toast with fallback error message if error is not instance of AppError", () => {
	const {toastContext} = setUp({error: new Error()});

	expect(toastContext.showToast).toHaveBeenCalledOnce();
	expect(toastContext.showToast).toHaveBeenCalledWith(
		"error",
		"Something went wrong."
	);
});
