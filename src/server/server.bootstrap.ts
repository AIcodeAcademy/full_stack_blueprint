import type { Server } from "bun";
import { api } from "./api/api.controller";
import { initializeUsersTable } from "./api/auth/auth.repository";
import { initializeToolsTable } from "./api/tools/tools.repository";
import { notFound } from "./shared/response.utils";

/**
 * Initialize the server
 */
export const initialize = () => {
	initializeToolsTable();
	initializeUsersTable();
	console.log("Server initialized");
};

/**
 * Process the request
 * @param request - The request
 * @param server - The server
 * @returns The response
 */
export const processRequest = (
	request: Request,
	server: Server,
): Response | Promise<Response> => {
	const url = new URL(request.url);
	if (url.pathname.startsWith("/api")) return api(request);
	return notFound();
};
