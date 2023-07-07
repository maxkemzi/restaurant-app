"use client";

import CheckboxField from "@/components/CheckboxField";
import {appendToQueryString, deleteFromQueryString} from "@/lib/helpers";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const PizzaFilters = () => {
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

	return (
		<div className="flex gap-6">
			<CheckboxField
				variant="error"
				label="Spicy"
				checked={isSpicy === "true"}
				onChange={handleCheck("isSpicy")}
			/>
			<CheckboxField
				variant="success"
				label="Vegan"
				checked={isVegan === "true"}
				onChange={handleCheck("isVegan")}
			/>
		</div>
	);
};

export default PizzaFilters;
