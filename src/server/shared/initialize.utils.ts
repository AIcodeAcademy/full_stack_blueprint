import type { Role } from "@/server/domain/role.type";
import type { Tool } from "@/server/domain/tool.type";
import { create, drop, insert, readCommands } from "@/server/shared/sql.utils";

// Read the SQL commands for the tables from the JSON files
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

const initializeUsersTable = (): void => {
	drop(usersSql.TABLE);
	create(usersSql.CREATE_TABLE);
};

const initializeRolesTable = (): void => {
	drop(rolesSql.TABLE);
	create(rolesSql.CREATE_TABLE);
	seedRoles();
};

const seedRoles = (): void => {
	for (const role of rolesSql.SEED) {
		insert<Role>(rolesSql.INSERT, role as Role);
	}
};

const initializeToolsTable = (): void => {
	drop(toolsSql.TABLE);
	create(toolsSql.CREATE_TABLE);
	seedTools();
};

const seedTools = (): void => {
	for (const tool of toolsSql.SEED) {
		insert<Tool>(toolsSql.INSERT, tool as Tool);
	}
};
