import { Database, type SQLQueryBindings } from "bun:sqlite";
import type { SQL } from "./sql.type";

const db = new Database(":memory:", { safeIntegers: false, strict: true });
const sqlFolder = process.env.SQL_FOLDER || "sql";

export async function readCommands(entityName: string): Promise<SQL> {
	const sql = await Bun.file(`${sqlFolder}/${entityName}.sql.json`).json();
	return sql;
}

export const selectAll = <R>(query: string): R[] => {
	const q = db.query(query);
	const r = q.all();
	return r as R[];
};

/**
 * Retrieves a single record by ID from the database
 * @template R - The type of the result
 * @param query - SQL query with $id parameter
 * @param id - The ID to search for
 * @returns The matching record cast to type R
 */
export const selectById = <R>(query: string, id: number): R => {
	const q = db.query(query);
	const r = q.get({ id });
	return r as R;
};

/**
 * Executes a SELECT query with optional parameters
 * @template P - The type of the parameters
 * @template R - The type of the result
 * @param query - SQL query string
 * @param params - Optional query parameters
 * @returns Query results cast to type R
 */
export const select = <P, R>(query: string, params?: P): R => {
	const q = db.query(query);
	const r = params ? q.all(params) : q.all();
	return r as R;
};

/**
 * Executes an INSERT query with parameters
 * @template P - The type of the parameters
 * @param query - SQL query string
 * @param params - Query parameters
 * @returns Number of affected rows
 */
export const insert = <P>(query: string, params: P): number => {
	if (!params) throw Error("Params are required");
	const q = db.query(query);
	const queryBindings: SQLQueryBindings = {
		...params,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};
	const r = q.run(queryBindings);
	if (!r.lastInsertRowid) throw new Error("Failed to insert");
	return Number(r.lastInsertRowid);
};

/**
 * Executes an UPDATE query with parameters
 * @template P - The type of the parameters
 * @param query - SQL query string
 * @param params - Query parameters
 * @returns Number of affected rows
 */
export const update = <P>(query: string, params: P): number => {
	if (!params) throw Error("Params are required");
	const q = db.query(query);
	const queryBindings: SQLQueryBindings = {
		...params,
		updatedAt: new Date().toISOString(),
	};
	const r = q.run(queryBindings);
	return r.changes;
};

/**
 * Creates a table in the database
 * @param tableCreationCommand - SQL command to create a table
 * @returns Number of affected rows
 */
export const create = (tableCreationCommand: string): number => {
	const q = db.query(tableCreationCommand);
	const r = q.run();
	return r.changes;
};

/**
 * Drops a table if it exists
 * @param tableName - Name of the table to drop
 * @returns Number of affected rows
 */
export const drop = (tableName: string): number => {
	const q = db.query(`DROP TABLE IF EXISTS ${tableName}`);
	const r = q.run();
	return r.changes;
};
