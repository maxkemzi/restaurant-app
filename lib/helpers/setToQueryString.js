const setToQueryString = (query, {name, value}) => {
	const params = new URLSearchParams(query);
	params.set(name, value);
	return params.toString();
};

export default setToQueryString;
