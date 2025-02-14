import { notFound, ok } from "../../shared/response.utils";
import { selectAllTools } from "./tools.repository";

export const tools = async (request: Request): Promise<Response> => {
	const url = new URL(request.url);
	const path = url.pathname;
	switch (path) {
		case "/api/tools":
			return await getTools(request);
		default:
			return notFound();
	}
};

const getTools = async (req: Request): Promise<Response> => {
	const tools = selectAllTools();
	return ok(tools);
};
