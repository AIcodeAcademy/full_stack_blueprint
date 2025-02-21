import type { ToolPostDto } from "@/server/domain/tool-post-dto.type";
import type { Tool } from "@/server/domain/tool.type";
import { getUserId } from "@/server/shared/request.utils";
import {
	badRequest,
	methodNotAllowed,
	ok,
	unauthorized,
} from "@server/shared/response.utils";
import { insertTool, selectAllTools } from "./tools.repository";

export const tools = async (request: Request): Promise<Response> => {
	const method = request.method;
	if (method === "GET") return getTools();
	if (method === "POST") return createTool(request);
	return methodNotAllowed();
};

const getTools = async (): Promise<Response> => {
	const tools = selectAllTools();
	return ok<Tool[]>(tools);
};

const createTool = async (request: Request): Promise<Response> => {
	const userId = getUserId(request);
	if (userId === 0) return unauthorized();
	const toolDto = (await request.json()) as ToolPostDto;
	if (!toolDto || !toolDto.name || !toolDto.description || !toolDto.url)
		return badRequest("Missing required fields");
	const tool = insertTool(toolDto);
	return ok<Tool>(tool);
};
