/**
 * Represents a new tool DTO
 */
export type ToolPostDto = {
	name: string;
	description: string;
	url: string;
};

export const NULL_TOOL_POST_DTO: ToolPostDto = {
	name: "",
	description: "",
	url: "",
};
