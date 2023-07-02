const parseQueryParams = params => {
	const result = {};

	Object.entries(params).forEach(([key, value]) => {
		if (value === null) {
			result[key] = undefined;
		} else if (!Number.isNaN(Number(value))) {
			result[key] = Number(value);
		} else if (value === "true" || value === "false") {
			result[key] = value === "true";
		} else if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
			result[key] = new Date(value);
		} else {
			result[key] = value;
		}
	});

	return result;
};

export default parseQueryParams;
