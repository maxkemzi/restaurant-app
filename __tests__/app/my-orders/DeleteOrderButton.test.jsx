import DeleteOrderButton from "@/app/my-orders/DeleteOrderButton";
import {useToastContext} from "@/lib/contexts";
import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import {createToastContext} from "../utils";

vi.mock("@/lib/contexts", () => ({
	useToastContext: vi.fn()
}));

describe("DeleteOrderButton", () => {
	it("renders button", () => {
		const toastContext = createToastContext();
		useToastContext.mockReturnValue(toastContext);

		render(<DeleteOrderButton />);

		const form = screen.getByRole("form");
		expect(form).toBeInTheDocument();

		const button = screen.getByRole("button", {name: /delete/i});
		expect(button).toBeInTheDocument();
		expect(button).toHaveAttribute("type", "submit");
	});

	// todo: add tests for delete order server action
});
