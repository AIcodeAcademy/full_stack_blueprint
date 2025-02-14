/**
 * Represents a tool with its properties
 */
export type Tool = {
	id: string;
	name: string;
	description: string;
	url: string;
};

/**
 * Default empty tool object
 */
export const NULL_TOOL: Tool = {
	id: "",
	name: "",
	description: "",
	url: "",
};
