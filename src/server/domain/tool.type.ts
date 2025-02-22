/**
 * Represents a tool with its properties
 */
export type Tool = {
	id: number;
	name: string;
	description: string;
	url: string;
	userOwnerId: number;
	createdAt: Date;
	updatedAt: Date;
};

/**
 * Default empty tool object
 */
export const NULL_TOOL: Tool = {
	id: 0,
	name: "",
	description: "",
	url: "",
	userOwnerId: 0,
	createdAt: new Date(),
	updatedAt: new Date(),
};
