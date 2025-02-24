import type { Category } from "../domain/categories.type";
import type { Role } from "../domain/role.type";
import type { Tool } from "../domain/tool.type";
import { create, drop, insert, readCommands } from "./sql.utils";

const usersSql = await readCommands("users");
const rolesSql = await readCommands("roles");
const toolsSql = await readCommands("tools");
const categoriesSql = await readCommands("categories");
const assetsSql = await readCommands("assets");

/**
 * Initializes the database
 */
export const initializeTables = async (): Promise<void> => {
	initializeUsersTable();
	initializeRolesTable();
	initializeToolsTable();
	initializeCategoriesTable();
	initializeAssetsTable();
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

const initializeCategoriesTable = (): void => {
	drop(categoriesSql.TABLE);
	create(categoriesSql.CREATE_TABLE);
	seedCategories();
};

const seedCategories = (): void => {
	for (const item of categoriesSql.SEED) {
		insert<Category>(categoriesSql.INSERT, item as Category);
	}
};

const initializeAssetsTable = (): void => {
	drop(assetsSql.TABLE);
	create(assetsSql.CREATE_TABLE);
};
