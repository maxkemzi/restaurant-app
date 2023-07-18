import {ToastProvider, useToastContext} from "@/lib/contexts";
import {act, fireEvent, render, screen} from "@testing-library/react";
import {beforeEach, expect, it, vi} from "vitest";

const TestComponent = () => {
	const {showToast} = useToastContext();

	const handleShowSuccessToast = () => showToast("success", "Success Message");
	const handleShowErrorToast = () => showToast("error", "Error Message");

	return (
		<div>
			<button onClick={handleShowSuccessToast} type="button">
				Show Success Toast
			</button>
			<button onClick={handleShowErrorToast} type="button">
				Show Error Toast
			</button>
		</div>
	);
};

beforeEach(() => {
	vi.useFakeTimers();
});

it("should show and hide success toast", () => {
	render(
		<ToastProvider>
			<TestComponent />
		</ToastProvider>
	);

	expect(screen.queryByText("Success Message")).toBeNull();

	const successButton = screen.getByText("Show Success Toast");
	fireEvent.click(successButton);

	expect(screen.getByText("Success Message")).toBeInTheDocument();

	act(() => {
		vi.advanceTimersByTime(3000);
	});

	expect(screen.queryByText("Success Message")).toBeNull();
});

it("should show and hide error toast", async () => {
	render(
		<ToastProvider>
			<TestComponent />
		</ToastProvider>
	);

	expect(screen.queryByText("Error Message")).toBeNull();

	const errorButton = screen.getByText("Show Error Toast");
	fireEvent.click(errorButton);

	expect(screen.getByText("Error Message")).toBeInTheDocument();

	act(() => {
		vi.advanceTimersByTime(3000);
	});

	expect(screen.queryByText("Error Message")).toBeNull();
});
