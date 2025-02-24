import { BAD_REQUEST_ERROR } from "../shared/api-error.type";
import type { Tool } from "./tool.type";
import type { User } from "./user.type";
/**
 * Validates a tool
 * @param tool - The tool to validate
 * @throws BAD_REQUEST_ERROR if the tool is invalid
 */
export const validateTool = (tool: Partial<Tool>): void => {
	if (!tool.name || !tool.description || !tool.url) {
		throw BAD_REQUEST_ERROR;
	}
};

/**
 * Validates a user
 * @param user - The user to validate
 * @throws BAD_REQUEST_ERROR if the user is invalid
 */
export const validateUser = (user: Partial<User>): void => {
	if (!user.email || !user.password) {
		throw BAD_REQUEST_ERROR;
	}
};
