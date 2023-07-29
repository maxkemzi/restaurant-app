const deleteFromQueryString = (query, name) => {
	const params = new URLSearchParams(query);

	const paramDoesNotExist = !params.has(name);
	if (paramDoesNotExist) {
		throw new Error(
			`Parameter with name '${name}' doesn't exist in the query string provided.`
		);
	}

	params.delete(name);

	return params.toString();
};

export default deleteFromQueryString;
