"use client";

import Select from "@/components/ui/Select";
import SelectOption from "@/components/ui/SelectOption";
import {deleteFromQueryString, setToQueryString} from "@/lib/helpers";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const SortSelect = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const sort = searchParams.get("sort");

	const setSearchParam = (name, val) =>
		router.push(
			`${pathname}?${setToQueryString(searchParams, {name, value: val})}`
		);

	const removeSearchParam = name =>
		router.push(`${pathname}?${deleteFromQueryString(searchParams, name)}`);

	const handleSelect = e => {
		if (e.target.value) {
			setSearchParam("sort", e.target.value);
		} else {
			removeSearchParam("sort");
		}
	};

	return (
		<Select value={sort || ""} onChange={handleSelect}>
			<SelectOption value="">Sort by</SelectOption>
			<SelectOption value="priceAsc">Price: Low to High</SelectOption>
			<SelectOption value="priceDesc">Price: High to Low</SelectOption>
		</Select>
	);
};

export default SortSelect;
