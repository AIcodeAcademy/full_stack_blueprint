import { type Changes, Database, type SQLQueryBindings } from "bun:sqlite";
import { AppError } from "./app-error.class";
import type { Raw, SQL } from "./sql.type";

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
 * @throws AppError if the record is not found
 */
export const selectById = <R>(query: string, id: number): R => {
	const q = db.query(query);
	const r = q.get({ id });
	if (!r) throw new AppError("Record not found", "DATABASE");
	return r as R;
};

/**
 * Executes a SELECT query with a user ID parameter
 * @template R - The type of the result
 * @param query - SQL query string
 * @param userId - The user ID to filter by
 * @returns Query results cast to type R
 */
export const selectByUserId = <R>(query: string, userId: number): R[] => {
	const q = db.query(query);
	const r = q.all({ userId });
	return r as R[];
};

/**
 * Executes a SELECT query with a user ID parameter
 * @template R - The type of the result
 * @param query - SQL query string
 * @param field - The field to filter by
 * @param value - The value to filter by
 * @returns Query results cast to type R
 */
export const selectByField = <R>(
	query: string,
	field: string,
	value: unknown,
): R[] => {
	const q = db.query(query);
	const queryBindings: SQLQueryBindings = {
		[field]: value,
	} as SQLQueryBindings;
	const r = q.all(queryBindings);
	return r as R[];
};

/**
 * Executes a SELECT query with optional parameters
 * @template R - The type of the result
 * @param query - SQL query string
 * @param params - Optional query parameters
 * @returns Query results cast to type R
 */
export const select = <R>(query: string, params?: unknown): R => {
	const q = db.query(query);
	const r = params ? q.all(params as SQLQueryBindings) : q.all();
	return r as R;
};

/**
 * Executes an INSERT query with parameters
 * @template P - The type of the parameters
 * @param query - SQL query string
 * @param entity - Query parameters
 * @returns Number of affected rows
 */
export const insert = <E>(query: string, entity: Raw<E>): number => {
	if (!entity) throw new AppError("Entity to insert is required", "DATABASE");
	const q = db.query(query);
	const queryBindings: SQLQueryBindings = {
		...entity,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	};
	const r: Changes = q.run(queryBindings);
	if (r.changes === 0) throw new AppError("Failed to insert", "DATABASE");
	return Number(r.lastInsertRowid);
};

/**
 * Executes an UPDATE query with parameters
 * @template P - The type of the parameters
 * @param query - SQL query string
 * @param params - The parameters to update
 * @returns Number of affected rows
 */
export const update = <P>(query: string, params: P): number => {
	if (!params) throw new AppError("Params to update are required", "DATABASE");
	const q = db.query(query);
	const queryBindings: SQLQueryBindings = {
		...params,
		updated_at: new Date().toISOString(),
	};
	const r: Changes = q.run(queryBindings);
	return r.changes;
};

/**
 * Creates a table in the database
 * @param tableCreationCommand - SQL command to create a table
 * @returns Number of affected items
 */
export const create = (tableCreationCommand: string): number => {
	const q = db.query(tableCreationCommand);
	const r = q.run();
	return r.changes;
};

/**
 * Drops a table if it exists
 * @param tableName - Name of the table to drop
 * @returns Number of affected items
 */
export const drop = (tableName: string): number => {
	const q = db.query(`DROP TABLE IF EXISTS ${tableName}`);
	const r = q.run();
	return r.changes;
};
