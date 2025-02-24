import { AppError } from "../shared/app-error.class";

/**
 * Represents a tool with its properties
 */
export type Tool = {
	id: number;
	name: string;
	description: string;
	url: string;
	user_id: number;
	created_at: Date;
	updated_at: Date;
};

/**
 * Default empty tool object
 */
export const NULL_TOOL: Tool = {
	id: 0,
	name: "",
	description: "",
	url: "",
	user_id: 0,
	created_at: new Date(),
	updated_at: new Date(),
};

/**
 * Validates a tool
 * @param tool - The tool to validate
 * @throws BAD_REQUEST_ERROR if the tool is invalid
 */
export const validateTool = (tool: Partial<Tool>): void => {
	if (!tool.name || !tool.description || !tool.url) {
		throw new AppError("Invalid tool", "LOGIC");
	}
};
