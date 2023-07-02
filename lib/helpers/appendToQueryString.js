const appendToQueryString = (query, {name, value}) => {
	const params = new URLSearchParams(query);
	params.append(name, value);
	return params.toString();
};

export default appendToQueryString;
