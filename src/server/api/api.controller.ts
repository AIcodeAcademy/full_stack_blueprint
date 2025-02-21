import { setUserId } from "../shared/request.utils";
import { handleInternalError, notFound } from "../shared/response.utils";
import { auth } from "./auth/auth.controller";
import { tools } from "./tools/tools.controller";

export const api = async (request: Request): Promise<Response> => {
	try {
		const url = new URL(request.url);
		const path = url.pathname;
		setUserId(request);
		if (path.startsWith("/api/auth")) return await auth(request);
		if (path.startsWith("/api/tools")) return await tools(request);
		return notFound();
	} catch (error) {
		return handleInternalError(error);
	}
};
