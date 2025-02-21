import type { ToolPostDto } from "@/server/domain/tool-post-dto.type";
import { NULL_TOOL, type Tool } from "@server/domain/tool.type";
import { insert, selectAll, selectById } from "@server/shared/sql.utils";

const sqlFolder = process.env.SQL_FOLDER || "sql";
const toolsSql = await Bun.file(`${sqlFolder}/tools.sql.json`).json();

export const selectAllTools = (): Tool[] => {
	const results = selectAll<Tool>(toolsSql.SELECT_ALL_TOOLS);
	return results || [];
};

export const selectToolById = (id: number): Tool => {
	const result = selectById<Tool>(toolsSql.SELECT_TOOL_BY_ID, id);
	return result || NULL_TOOL;
};

export const insertTool = (toolDto: ToolPostDto): Tool => {
	const newToolId = insert<ToolPostDto>(toolsSql.INSERT_TOOL, toolDto);
	const newTool = selectById<Tool>(toolsSql.SELECT_TOOL_BY_ID, newToolId);
	return newTool || NULL_TOOL;
};
