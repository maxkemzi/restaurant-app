import mockRequestResponse from "./mocks/mockRequestResponse";

const requestHandler = async (
	handler,
	{method, body, query} = {method: "GET", body: {}, query: {}}
) => {
	const {req, res} = mockRequestResponse(method, body, query);
	await handler(req, res);
	return {body: res._getJSONData(), statusCode: res.statusCode};
};

export default requestHandler;
