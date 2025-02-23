import type { Category } from "../domain/category.type";
import type { Tool } from "../domain/tool.type";
import { create, drop, insert, readCommands } from "./sql.utils";

const usersSql = await readCommands("users");
const rolesSql = await readCommands("roles");
const toolsSql = await readCommands("tools");
const categorySQL = await readCommands("category");
const assetSQL = await readCommands("asset");

/**
 * Initializes the database
 */
export const initializeTables = async (): Promise<void> => {
	initializeUsersTable();
	initializeRolesTable();
	initializeToolsTable();
	initializeCategoryTable();
	seedCategory();
	initializeAssetTable();
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

const initializeCategoryTable = (): number => {
	drop(categorySQL.TABLE);
	const result = create(categorySQL.CREATE_TABLE);
	return result;
};

const seedCategory = (): number => {
	let results = 0;
	for (const item of categorySQL.SEED) {
		results += insert<Category>(categorySQL.INSERT, item as Category);
	}
	return results;
};

const initializeAssetTable = (): number => {
	drop(assetSQL.TABLE);
	const result = create(assetSQL.CREATE_TABLE);
	return result;
};
