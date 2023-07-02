const deleteFromQueryString = (query, name) => {
	const params = new URLSearchParams(query);
	params.delete(name);
	return params.toString();
};

export default deleteFromQueryString;
