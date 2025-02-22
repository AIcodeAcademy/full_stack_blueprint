import type { Tool } from "../domain/tool.type";
import { create, drop, insert, readCommands } from "./sql.utils";

const sqlFolder = process.env.SQL_FOLDER || "sql";
const usersSql = await readCommands("users");
const rolesSql = await readCommands("roles");
const toolsSql = await readCommands("tools");

/**
 * Initializes the database
 */
export const initializeTables = async (): Promise<void> => {
	initializeUsersTable();
	initializeRolesTable();
	initializeToolsTable();
};

const initializeUsersTable = (): number => {
	drop(usersSql.TABLE);
	const result = create(usersSql.CREATE_TABLE);
	return result;
};

const initializeRolesTable = (): number => {
	drop(rolesSql.TABLE);
	const result = create(rolesSql.CREATE_TABLE);
	return result;
};

const initializeToolsTable = (): number => {
	drop(toolsSql.TABLE);
	create(toolsSql.CREATE_TABLE);
	return seedTools();
};

const seedTools = (): number => {
	let results = 0;
	for (const tool of toolsSql.SEED) {
		results += insert<Tool>(toolsSql.INSERT, tool as Tool);
	}
	return results;
};
