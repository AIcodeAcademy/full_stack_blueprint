import type { Tool } from "@/server/domain/tool.type";
import { validateTool } from "@/server/domain/validations.utils";
import type { EntityProperties } from "@/server/shared/entity-params.type";
import { validateUserId } from "@/server/shared/request.utils";
import { ok } from "@server/shared/response.utils";
import type { ToolPostRequest } from "./tool-post-request.type";
import { insertTool, selectAllTools } from "./tools.repository";

export const toolsRoutes = {
	GET: () => getTools(),
	POST: async (request: Request) => await postTool(request),
};

const getTools = (): Response => {
	const tools = selectAllTools();
	return ok<Tool[]>(tools);
};

const postTool = async (request: Request): Promise<Response> => {
	const userId = validateUserId(request);
	const toolDto = (await request.json()) as ToolPostRequest;
	const toolToInsert: Partial<Tool> = {
		...toolDto,
		userOwnerId: userId,
	};
	validateTool(toolToInsert);
	const tool = insertTool(toolToInsert as Omit<Tool, EntityProperties>);
	return ok<Tool>(tool);
};
