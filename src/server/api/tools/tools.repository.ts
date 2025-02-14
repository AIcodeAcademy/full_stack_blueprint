import { NULL_TOOL, type Tool } from "../../domain/tool.type";
import { create, drop, insert, select } from "../../shared/sql.utils";

const sqlFolder = process.env.SQL_FOLDER || "sql";
const toolsSql = await Bun.file(`${sqlFolder}/tools.sql.json`).json();

export const initializeToolsTable = (): number => {
	drop(toolsSql.TABLE_NAME);
	create(toolsSql.CREATE_TABLE);
	return seedTools();
};

export const selectAllTools = (): Tool[] => {
	return select(toolsSql.SELECT_ALL_TOOLS) as Tool[];
};

export const selectToolById = (id: string): Tool => {
	const results = select(toolsSql.SELECT_TOOL_BY_ID, { $id: id });
	return (results[0] as Tool) || NULL_TOOL;
};

export const seedTools = (): number => {
	let results = 0;
	for (const tool of toolsSql.SEED_TOOLS) {
		results += insert(toolsSql.INSERT_TOOL, tool);
	}
	return results;
};
