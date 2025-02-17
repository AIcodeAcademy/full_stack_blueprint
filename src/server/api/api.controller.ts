import type { JwtData } from "../domain/jwt-data.type";
import { verifyJWT } from "../shared/jwt.utils";
import { handleInternalError, notFound } from "../shared/response.utils";
import { auth } from "./auth/auth.controller";
import { tools } from "./tools/tools.controller";

export const api = async (request: Request): Promise<Response> => {
	try {
		const url = new URL(request.url);
		const path = url.pathname;
		const userId = extractUserId(request);
		request.headers.set("userId", userId.toString());
		if (path.startsWith("/api/tools")) return await tools(request);
		if (path.startsWith("/api/auth")) return await auth(request);
		return notFound();
	} catch (error) {
		return handleInternalError(error);
	}
};

const extractAuthorization = (request: Request): string => {
	const authorization = request.headers.get("Authorization");
	const token = authorization ? authorization.split(" ")[1] : "";
	return token;
};

const extractUserId = (request: Request): number => {
	const token = extractAuthorization(request);
	const jwtData: JwtData = verifyJWT(token);
	return jwtData.userId;
};
