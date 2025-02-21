import { setUserId } from "../shared/request.utils";
import { handleInternalError, notFound } from "../shared/response.utils";
import { authController } from "./auth/auth.controller";
import { toolsController } from "./tools/tools.controller";

export const api = async (request: Request): Promise<Response> => {
	try {
		const url = new URL(request.url);
		const path = url.pathname;
		setUserId(request);
		if (path.startsWith("/api/auth")) return await authController(request);
		if (path.startsWith("/api/tools")) return await toolsController(request);
		return notFound();
	} catch (error) {
		return handleInternalError(error as Error);
	}
};
