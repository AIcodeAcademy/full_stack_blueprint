import { Database } from "bun:sqlite";

const db = new Database(":memory:", { safeIntegers: false });

// biome-ignore lint: params could be really any thing
export const select = (query: string, params?: any): unknown[] => {
	const q = db.query(query);
	const r = q.all(params);
	return r;
};

// biome-ignore lint: params could be really any thing
export const insert = (query: string, params: any): number => {
	const result = db.query(query).run(params);
	return Number(result.lastInsertRowid);
};

export const update = (query: string): number => {
	const result = db.query(query).run();
	return Number(result.changes);
};

export const create = (query: string): number => {
	const result = db.query(query).run();
	return Number(result.changes);
};

export const drop = (table: string): number => {
	const result = db.query(`DROP TABLE IF EXISTS ${table}`).run();
	return Number(result.changes);
};
