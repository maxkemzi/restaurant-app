"use client";

import CheckboxField from "@/src/components/ui/CheckboxField";
import {appendToQueryString, deleteFromQueryString} from "@/src/lib/helpers";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const ProductFilters = ({hasSpicyProducts, hasVeganProducts, testId}) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const isSpicy = searchParams.get("isSpicy");
	const isVegan = searchParams.get("isVegan");

	const appendSearchParam = (name, value) =>
		router.push(
			`${pathname}?${appendToQueryString(searchParams, {name, value})}`
		);

	const removeSearchParam = name =>
		router.push(`${pathname}?${deleteFromQueryString(searchParams, name)}`);

	const handleCheck = param => e => {
		if (e.target.checked) {
			appendSearchParam(param, true);
		} else {
			removeSearchParam(param);
		}
	};

	const hasNoProductsToFilter = !hasSpicyProducts && !hasVeganProducts;
	if (hasNoProductsToFilter) {
		return null;
	}

	return (
		<div className="flex gap-4 md:gap-6" data-testid={testId}>
			{hasSpicyProducts ? (
				<CheckboxField
					variant="error"
					label="Spicy"
					checked={isSpicy === "true"}
					onChange={handleCheck("isSpicy")}
				/>
			) : null}

			{hasVeganProducts ? (
				<CheckboxField
					variant="success"
					label="Vegan"
					checked={isVegan === "true"}
					onChange={handleCheck("isVegan")}
				/>
			) : null}
		</div>
	);
};

export default ProductFilters;
