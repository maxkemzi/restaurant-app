import {createMocks} from "node-mocks-http";

const mockRequestResponse = (method = "GET", body = {}, query = {}) => {
	const {req, res} = createMocks({method});
	req.body = body;
	req.query = query;
	req.headers = {"Content-Type": "application/json"};
	return {req, res};
};

export default mockRequestResponse;
