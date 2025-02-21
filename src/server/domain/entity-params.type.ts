export type EntityParams = {
	$id?: number;
	$createdAt?: Date;
	$updatedAt?: Date;
};

export const NULL_ENTITY_PARAMS: EntityParams = {
	$id: 0,
	$createdAt: new Date(),
	$updatedAt: new Date(),
};
