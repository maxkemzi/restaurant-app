import SortSelect from "@/app/products/SortSelect";
import {render, within, screen} from "@testing-library/react";
import {describe, it, vi, expect} from "vitest";

vi.mock("next/navigation", () => ({
	...require("next-router-mock"),
	useSearchParams: () => ({get: vi.fn()}),
	usePathname: vi.fn()
}));

describe("SortSelect", () => {
	it("renders sort select", () => {
		render(<SortSelect />);

		const select = screen.getByRole("combobox");
		expect(select).toBeInTheDocument();

		const sortByOption = within(select).getByRole("option", {name: /sort by/i});
		expect(sortByOption).toBeInTheDocument();
		expect(sortByOption).toHaveValue("");

		const priceLowToHighOption = within(select).getByRole("option", {
			name: /Price: Low to High/i
		});
		expect(priceLowToHighOption).toBeInTheDocument();
		expect(priceLowToHighOption).toHaveValue("priceAsc");

		const priceHighToLowOption = within(select).getByRole("option", {
			name: /Price: High to Low/i
		});
		expect(priceHighToLowOption).toBeInTheDocument();
		expect(priceHighToLowOption).toHaveValue("priceDesc");
	});
});
