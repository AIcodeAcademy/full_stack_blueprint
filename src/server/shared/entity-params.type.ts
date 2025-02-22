export type EntityParams = {
	id?: number;
	createdAt?: string;
	updatedAt?: string;
};

export const NULL_ENTITY_PARAMS: EntityParams = {
	id: 0,
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
};
