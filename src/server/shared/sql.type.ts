export type SQL = {
	TABLE: string;
	CREATE_TABLE: string;
	SELECT_ALL: string;
	SELECT_BY_ID: string;
	SELECT_BY_FIELD: string;
	SELECT_BY_QUERY: string;
	SELECT_BY_USER_ID: string;
	INSERT: string;
	UPDATE: string;
	DELETE: string;
	SEED: unknown[];
};
export type EntityProperties = "id" | "createdAt" | "updatedAt";
export type EntityFields = {
	[key in EntityProperties]?: number | string;
};

export const NULL_ENTITY_FIELDS: EntityFields = {
	id: 0,
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
};
