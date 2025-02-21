import type { Tool } from "../domain/tool.type";
import { create, drop, insert } from "./sql.utils";

const sqlFolder = process.env.SQL_FOLDER || "sql";
const usersSql = await Bun.file(`${sqlFolder}/users.sql.json`).json();
const rolesSql = await Bun.file(`${sqlFolder}/roles.sql.json`).json();
const toolsSql = await Bun.file(`${sqlFolder}/tools.sql.json`).json();

/**
 * Initializes the database
 */
export const initializeTables = (): void => {
	initializeUsersTable();
	initializeRolesTable();
	initializeToolsTable();
};

const initializeUsersTable = (): number => {
	drop(usersSql.TABLE_NAME);
	const result = create(usersSql.CREATE_TABLE);
	return result;
};

const initializeRolesTable = (): number => {
	drop(rolesSql.TABLE_NAME);
	const result = create(rolesSql.CREATE_TABLE);
	return result;
};

const initializeToolsTable = (): number => {
	drop(toolsSql.TABLE_NAME);
	create(toolsSql.CREATE_TABLE);
	return seedTools();
};

const seedTools = (): number => {
	let results = 0;
	for (const tool of toolsSql.SEED_TOOLS) {
		results += insert<Tool>(toolsSql.INSERT_TOOL, tool);
	}
	return results;
};
