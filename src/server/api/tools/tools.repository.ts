import type { Raw } from "@/server/shared/sql.type";
import { NULL_TOOL, type Tool, validateTool } from "@server/domain/tool.type";
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

export const insertTool = (toolToInsert: Raw<Tool>): Tool => {
	validateTool(toolToInsert);
	const toolId = insert<Raw<Tool>>(toolsSql.INSERT, toolToInsert);
	const tool = selectById<Tool>(toolsSql.SELECT_BY_ID, toolId);
	return tool || NULL_TOOL;
};
