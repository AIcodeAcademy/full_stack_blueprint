import type { Tool } from "@/server/domain/tool.type";
import { guardGetUserId } from "@/server/shared/request.utils";
import type { Raw } from "@/server/shared/sql.type";
import { ok } from "@server/shared/response.utils";
import type { ToolPostRequest } from "./tool-post-request.type";
import { insertTool, selectAllTools } from "./tools.repository";

/**
 * Routes controller for /api/tools
 * - GET: Get all tools
 * - POST: Create a new tool
 * @description Object that wires the request to the correct controller
 */
export const toolsRoutes = {
	GET: async (request: Request) => await getTools(request),
	POST: async (request: Request) => await postTool(request),
};

const getTools = async (request: Request): Promise<Response> => {
	const tools = selectAllTools();
	return ok<Tool[]>(tools);
};

const postTool = async (request: Request): Promise<Response> => {
	const userId = guardGetUserId(request);
	const toolDto = (await request.json()) as ToolPostRequest;
	const toolToInsert: Raw<Tool> = {
		...toolDto,
		user_id: userId,
	};
	const tool = insertTool(toolToInsert);
	return ok<Tool>(tool);
};
