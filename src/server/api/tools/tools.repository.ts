import type { Raw } from "@/server/shared/sql.type";
import { type Tool, validateTool } from "@server/domain/tool.type";
import {
	insert,
	readCommands,
	selectAll,
	selectById,
} from "@server/shared/sql.utils";

const toolsSql = await readCommands("tools");

/**
 * Selects all tools
 * @returns The tools array
 */
export const selectAllTools = (): Tool[] => {
	const results = selectAll<Tool>(toolsSql.SELECT_ALL);
	return results || [];
};

/**
 * Selects a tool by id
 * @param id - The id of the tool
 * @returns The tool
 * @throws AppError if the tool is not found
 */
export const selectToolById = (id: number): Tool => {
	const result = selectById<Tool>(toolsSql.SELECT_BY_ID, id);
	return result;
};

/**
 * Inserts a tool
 * @param toolToInsert - The tool to insert
 * @returns The tool inserted
 * @throws AppError if the tool is not valid
 */
export const insertTool = (toolToInsert: Raw<Tool>): Tool => {
	validateTool(toolToInsert);
	const toolId = insert<Raw<Tool>>(toolsSql.INSERT, toolToInsert);
	const tool = selectById<Tool>(toolsSql.SELECT_BY_ID, toolId);
	return tool;
};
