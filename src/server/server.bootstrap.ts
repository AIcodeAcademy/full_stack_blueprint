import type { Server } from "bun";
import { api } from "./api/api.controller";
import { initializeUsersTable } from "./api/auth/auth.repository";
import { initializeToolsTable } from "./api/tools/tools.repository";
import { debug } from "./shared/log.utils";
import { addCors, corsPreflight, notFound } from "./shared/response.utils";

/**
 * Initialize the server
 */
export const initialize = () => {
	initializeToolsTable();
	initializeUsersTable();
	debug("Server", "initialized");
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
	if (request.method === "OPTIONS") return corsPreflight();
	if (url.pathname.startsWith("/api")) return api(request).then(addCors);
	return addCors(notFound());
};
