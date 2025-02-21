import type { Credentials } from "@/client/domain/credentials.type";
import { BAD_REQUEST_ERROR, METHOD_NOT_ALLOWED_ERROR } from "./api-error.type";
import type { Tool } from "./tool.type";

export const validatePostRequest = (request: Request): void => {
	if (request.method !== "POST") {
		throw METHOD_NOT_ALLOWED_ERROR;
	}
};

export const validateTool = (tool: Tool): void => {
	if (!tool.name || !tool.description || !tool.url) {
		throw BAD_REQUEST_ERROR;
	}
};

export const validateCredentials = (credentials: Credentials): void => {
	if (!credentials.email || !credentials.password) {
		throw BAD_REQUEST_ERROR;
	}
};
