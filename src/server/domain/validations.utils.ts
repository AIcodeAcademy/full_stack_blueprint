import { BAD_REQUEST_ERROR } from "../shared/api-error.type";
import type { Tool } from "./tool.type";
import type { User } from "./user.type";

export const validateTool = (tool: Partial<Tool>): void => {
	if (!tool.name || !tool.description || !tool.url) {
		throw BAD_REQUEST_ERROR;
	}
};

export const validateUser = (user: Partial<User>): void => {
	if (!user.email || !user.password) {
		throw BAD_REQUEST_ERROR;
	}
};
