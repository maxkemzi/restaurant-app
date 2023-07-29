"use client";

import Select from "@/src/components/ui/Select";
import {deleteFromQueryString, setToQueryString} from "@/src/lib/helpers";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const ParamSelect = ({paramName, defaultValue, children, testId}) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const param = searchParams.get(paramName);

	const setSearchParam = (name, val) =>
		router.push(
			`${pathname}?${setToQueryString(searchParams, {name, value: val})}`
		);

	const removeSearchParam = name =>
		router.push(`${pathname}?${deleteFromQueryString(searchParams, name)}`);

	const handleSelect = e => {
		if (e.target.value) {
			setSearchParam(paramName, e.target.value);
		} else {
			removeSearchParam(paramName);
		}
	};

	return (
		<Select
			value={param || defaultValue}
			onChange={handleSelect}
			testId={testId}>
			{children}
		</Select>
	);
};

export default ParamSelect;
