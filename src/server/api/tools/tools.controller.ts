import type { Tool } from "@/server/domain/tool.type";
import { methodNotAllowed, ok } from "@server/shared/response.utils";
import { selectAllTools } from "./tools.repository";

export const tools = async (request: Request): Promise<Response> => {
	const method = request.method;
	if (method !== "GET") return methodNotAllowed();
	return await getTools();
};

const getTools = async (): Promise<Response> => {
	const tools = selectAllTools();
	return ok<Tool[]>(tools);
};
