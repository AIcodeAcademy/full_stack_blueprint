import { handleInternalError, notFound } from "../shared/response.utils";
import { auth } from "./auth/auth.controller";
import { tools } from "./tools/tools.controller";

export const api = async (request: Request): Promise<Response> => {
	const url = new URL(request.url);
	const path = url.pathname;
	try {
		if (path.startsWith("/api/tools")) return await tools(request);
		if (path.startsWith("/api/auth")) return await auth(request);
		return notFound();
	} catch (error) {
		return handleInternalError(error);
	}
};
