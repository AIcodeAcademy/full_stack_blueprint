export type EntityProperties = "id" | "createdAt" | "updatedAt";
export type EntityFields = {
	[key in EntityProperties]?: number | string;
};

export const NULL_ENTITY_FIELDS: EntityFields = {
	id: 0,
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
};
