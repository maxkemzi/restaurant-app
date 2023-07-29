"use client";

import ParamSelect from "@/src/components/ParamSelect";
import SelectOption from "@/src/components/ui/SelectOption";

const SortSelect = () => (
	<ParamSelect paramName="sort" defaultValue="" testId="sort-select">
		<SelectOption value="" testId="sort-by-option">
			Sort by
		</SelectOption>
		<SelectOption value="priceAsc" testId="price-asc-option">
			Price: Low to High
		</SelectOption>
		<SelectOption value="priceDesc" testId="price-desc-option">
			Price: High to Low
		</SelectOption>
	</ParamSelect>
);

export default SortSelect;
