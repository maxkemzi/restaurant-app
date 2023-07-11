import ProductFilters from "@/app/products/ProductFilters";
import {render, screen} from "@testing-library/react";
import {describe, it, vi, expect} from "vitest";

vi.mock("next/navigation", () => ({
	...require("next-router-mock"),
	useSearchParams: () => ({get: vi.fn()}),
	usePathname: vi.fn()
}));

describe("ProductFilters", () => {
	it("renders product filters", () => {
		render(<ProductFilters />);

		const isSpicyFilter = screen.getByLabelText("Spicy");
		expect(isSpicyFilter).toBeInTheDocument();

		const isVeganFilter = screen.getByLabelText("Vegan");
		expect(isVeganFilter).toBeInTheDocument();
	});

	it("renders only is spicy filter", () => {
		const displaySettings = {isVegan: false, isSpicy: true};

		render(<ProductFilters displaySettings={displaySettings} />);

		const isSpicyFilter = screen.getByLabelText("Spicy");
		expect(isSpicyFilter).toBeInTheDocument();

		const isVeganFilter = screen.queryByLabelText("Vegan");
		expect(isVeganFilter).not.toBeInTheDocument();
	});

	it("renders only is vegan filter", () => {
		const displaySettings = {isVegan: true, isSpicy: false};

		render(<ProductFilters displaySettings={displaySettings} />);

		const isSpicyFilter = screen.queryByLabelText("Spicy");
		expect(isSpicyFilter).not.toBeInTheDocument();

		const isVeganFilter = screen.getByLabelText("Vegan");
		expect(isVeganFilter).toBeInTheDocument();
	});

	it("doesn't render filters", () => {
		const displaySettings = {isVegan: false, isSpicy: false};

		const {container} = render(
			<ProductFilters displaySettings={displaySettings} />
		);

		expect(container).toBeEmptyDOMElement();
	});
});
