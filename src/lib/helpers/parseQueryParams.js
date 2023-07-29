const parseQueryParams = params => {
	const result = {};

	Object.entries(params).forEach(([key, value]) => {
		if (value === null) {
			result[key] = undefined;
		} else if (String(Number(value)) === value) {
			result[key] = Number(value);
		} else if (value === "true" || value === "false") {
			result[key] = value === "true";
		} else {
			result[key] = value;
		}
	});

	return result;
};

export default parseQueryParams;
