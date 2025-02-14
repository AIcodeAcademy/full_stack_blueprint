import { NULL_TOOL, type Tool } from "@server/domain/tool.type";
import {
	create,
	drop,
	insert,
	selectAll,
	selectById,
} from "@server/shared/sql.utils";

const sqlFolder = process.env.SQL_FOLDER || "sql";
const toolsSql = await Bun.file(`${sqlFolder}/tools.sql.json`).json();

export const initializeToolsTable = (): number => {
	drop(toolsSql.TABLE_NAME);
	create(toolsSql.CREATE_TABLE);
	return seedTools();
};

export const selectAllTools = (): Tool[] => {
	const results = selectAll<Tool>(toolsSql.SELECT_ALL_TOOLS);
	return results || [];
};

export const selectToolById = (id: string): Tool => {
	const result = selectById<Tool>(toolsSql.SELECT_TOOL_BY_ID, id);
	return result || NULL_TOOL;
};

export const seedTools = (): number => {
	let results = 0;
	for (const tool of toolsSql.SEED_TOOLS) {
		results += insert<Tool>(toolsSql.INSERT_TOOL, tool);
	}
	return results;
};
