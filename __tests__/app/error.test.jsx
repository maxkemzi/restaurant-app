import ErrorComponent from "@/app/error";
import {useToastContext} from "@/lib/contexts";
import {AppError} from "@/lib/error";
import {fireEvent, render} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";

vi.mock("@/lib/contexts", () => ({
	useToastContext: vi.fn()
}));

describe("Error", () => {
	it("renders fallback component", () => {
		const errorMock = new Error("Test error message");
		const resetMock = vi.fn();
		useToastContext.mockReturnValue({showToast: vi.fn()});

		const {getByRole, getByText} = render(
			<ErrorComponent error={errorMock} reset={resetMock} />
		);

		const errorMessage = getByText(
			new RegExp(`Error: ${errorMock.message}`, "i")
		);
		expect(errorMessage).toBeInTheDocument();

		const button = getByRole("button", /try again/i);
		expect(button).toBeInTheDocument();
	});

	it("calls reset function when button is clicked", () => {
		const errorMock = new Error("Test error message");
		const resetMock = vi.fn();
		useToastContext.mockReturnValue({showToast: vi.fn()});

		const {getByRole} = render(
			<ErrorComponent error={errorMock} reset={resetMock} />
		);

		const button = getByRole("button", {name: /try again/i});
		fireEvent.click(button);

		expect(resetMock).toHaveBeenCalledTimes(1);
	});

	it("calls showToast with error message", () => {
		const errorMock = new AppError("Test error message");
		const resetMock = vi.fn();
		const showToastMock = vi.fn();
		useToastContext.mockReturnValue({showToast: showToastMock});

		render(<ErrorComponent error={errorMock} reset={resetMock} />);

		expect(showToastMock).toHaveBeenCalledTimes(1);
		expect(showToastMock).toHaveBeenCalledWith("error", errorMock.message);
	});

	it("calls showToast with fallback error message if error is not instance of AppError", () => {
		const errorMock = new Error("Test error message");
		const resetMock = vi.fn();
		const showToastMock = vi.fn();
		useToastContext.mockReturnValue({showToast: showToastMock});

		render(<ErrorComponent error={errorMock} reset={resetMock} />);

		expect(showToastMock).toHaveBeenCalledTimes(1);
		expect(showToastMock).toHaveBeenCalledWith(
			"error",
			"Something went wrong."
		);
	});
});
