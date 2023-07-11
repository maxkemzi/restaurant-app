"use client";

import CheckboxField from "@/components/CheckboxField";
import {appendToQueryString, deleteFromQueryString} from "@/lib/helpers";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const ProductFilters = ({displaySettings}) => {
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

	const display = {
		isSpicy: displaySettings?.isSpicy != null ? displaySettings.isSpicy : true,
		isVegan: displaySettings?.isVegan != null ? displaySettings.isVegan : true
	};

	const noDisplayedFilter = Object.values(display).every(
		value => value === false
	);
	if (noDisplayedFilter) {
		return null;
	}

	return (
		<div className="flex gap-4 md:gap-6">
			{display.isSpicy ? (
				<CheckboxField
					variant="error"
					label="Spicy"
					checked={isSpicy === "true"}
					onChange={handleCheck("isSpicy")}
				/>
			) : null}

			{display.isVegan ? (
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
