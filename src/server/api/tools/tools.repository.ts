import type { ToolPostDto } from "@/server/domain/tool-post-dto.type";
import { NULL_TOOL, type Tool } from "@server/domain/tool.type";
import {
	insert,
	readCommands,
	selectAll,
	selectById,
} from "@server/shared/sql.utils";

const toolsSql = await readCommands("tools");

export const selectAllTools = (): Tool[] => {
	const results = selectAll<Tool>(toolsSql.SELECT_ALL);
	return results || [];
};

export const selectToolById = (id: number): Tool => {
	const result = selectById<Tool>(toolsSql.SELECT_BY_ID, id);
	return result || NULL_TOOL;
};

export const insertTool = (toolDto: ToolPostDto): Tool => {
	const newToolId = insert<ToolPostDto>(toolsSql.INSERT, toolDto);
	const newTool = selectById<Tool>(toolsSql.SELECT_BY_ID, newToolId);
	return newTool || NULL_TOOL;
};
