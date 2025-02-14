import { Database } from "bun:sqlite";

const db = new Database(":memory:", { safeIntegers: false });

export const selectAll = <R>(query: string): R[] => {
	const q = db.query(query);
	const r = q.all();
	return r as R[];
};

export const selectById = <R>(query: string, id: string): R => {
	const q = db.query(query);
	const r = q.get({ $id: id });
	return r as R;
};

export const select = <P, R>(query: string, params?: P): R => {
	const q = db.query(query);
	const r = params ? q.all(params) : q.all();
	return r as R;
};

export const insert = <P>(query: string, params: P): number => {
	const q = db.query(query);
	const r = params ? q.run(params) : q.run();
	return r.changes;
};

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

export const drop = (tableName: string): number => {
	const q = db.query(`DROP TABLE IF EXISTS ${tableName}`);
	const r = q.run();
	return r.changes;
};
