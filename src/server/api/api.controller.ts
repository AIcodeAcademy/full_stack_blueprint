import { handleInternalError, notFound } from "../shared/response.utils";
import { tools } from "./tools/tools.controller";

export const api = async (request: Request): Promise<Response> => {
	const url = new URL(request.url);
	const path = url.pathname;
	try {
		if (path.startsWith("/api/tools")) return await tools(request);
		return notFound();
	} catch (error) {
		return handleInternalError(error);
	}
};
