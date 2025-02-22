/**
 * Represents a new tool DTO
 */
export type ToolPostRequest = {
	name: string;
	description: string;
	url: string;
};

export const NULL_TOOL_POST_DTO: ToolPostRequest = {
	name: "",
	description: "",
	url: "",
};
