import { Database } from "bun:sqlite";

const db = new Database(":memory:", { safeIntegers: false });

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
export const selectById = <R>(query: string, id: string): R => {
	const q = db.query(query);
	const r = q.get({ $id: id });
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
	const q = db.query(query);
	const r = params ? q.run(params) : q.run();
	return r.changes;
};

/**
 * Executes an UPDATE query with parameters
 * @template P - The type of the parameters
 * @param query - SQL query string
 * @param params - Query parameters
 * @returns Number of affected rows
 */
export const update = <P>(query: string, params: P): number => {
	const q = db.query(query);
	const r = params ? q.run(params) : q.run();
	return r.changes;
};

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
