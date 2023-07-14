import ProductFilters from "@/components/ProductFilters";
import {render, screen} from "@testing-library/react";
import {expect, it, vi} from "vitest";

vi.mock("next/navigation", () => ({
	...require("next-router-mock"),
	useSearchParams: vi.fn(() => new URLSearchParams()),
	usePathname: vi.fn()
}));

it("renders all filters if there are vegan and spicy products", async () => {
	render(<ProductFilters hasSpicyProducts hasVeganProducts />);

	const spicyFilter = screen.getByLabelText("Spicy");
	expect(spicyFilter).toBeInTheDocument();
	const veganFilter = screen.getByLabelText("Vegan");
	expect(veganFilter).toBeInTheDocument();
});

it("doesn't render filters if there are no either vegan or spicy products", async () => {
	render(<ProductFilters />);

	const spicyFilter = screen.queryByLabelText("Spicy");
	expect(spicyFilter).not.toBeInTheDocument();
	const veganFilter = screen.queryByLabelText("Vegan");
	expect(veganFilter).not.toBeInTheDocument();
});

it("renders only spicy filter if there are only spicy products", async () => {
	render(<ProductFilters hasSpicyProducts />);

	const spicyFilter = screen.getByLabelText("Spicy");
	expect(spicyFilter).toBeInTheDocument();
	const veganFilter = screen.queryByLabelText("Vegan");
	expect(veganFilter).not.toBeInTheDocument();
});

it("renders only vegan filter if there are only vegan products", async () => {
	render(<ProductFilters hasVeganProducts />);

	const spicyFilter = screen.queryByLabelText("Spicy");
	expect(spicyFilter).not.toBeInTheDocument();
	const veganFilter = screen.getByLabelText("Vegan");
	expect(veganFilter).toBeInTheDocument();
});
