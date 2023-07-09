import {nanoid} from "nanoid";
import {NextResponse} from "next/server";

const middleware = request => {
	const clientId = request.cookies.get("clientId")?.value || nanoid();

	const response = NextResponse.next();

	const dayInSeconds = 86400;
	const maxAge = 400 * dayInSeconds;
	response.cookies.set("clientId", clientId, {maxAge, httpOnly: true});

	return response;
};

export {middleware};
