import { METHOD_NOT_ALLOWED_ERROR } from "@/server/domain/api-error.type";
import type { Tool } from "@/server/domain/tool.type";
import { validateTool } from "@/server/domain/validations.utils";
import { validateUserId } from "@/server/shared/request.utils";
import { ok } from "@server/shared/response.utils";
import { insertTool, selectAllTools } from "./tools.repository";

/**
 * Tools controller for /api/tools endpoints
 * @param request - The request
 * @returns The response
 */
export const toolsController = async (request: Request): Promise<Response> => {
	const method = request.method;
	if (method === "GET") return getTools();
	if (method === "POST") return postTool(request);
	throw METHOD_NOT_ALLOWED_ERROR;
};

const getTools = async (): Promise<Response> => {
	const tools = selectAllTools();
	return ok<Tool[]>(tools);
};

const postTool = async (request: Request): Promise<Response> => {
	const userId = validateUserId(request);
	const toolDto = await request.json();
	validateTool(toolDto);
	toolDto.userId = userId;
	const tool = insertTool(toolDto);
	return ok<Tool>(tool);
};
