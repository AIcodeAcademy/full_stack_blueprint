import type { Server } from "bun";
import { api } from "./api/api.controller";
import { initializeTables } from "./shared/intitialize.utils";
import { debug } from "./shared/log.utils";
import { addCors, corsPreflight, notFound } from "./shared/response.utils";

const initializeServer = () => {
	initializeTables();
	debug("Database", "initialized");
	const bunServer = Bun.serve({
		development: true,
		fetch: processRequest,
	});
	debug("Server ready", bunServer);
};

const processRequest = (
	request: Request,
	server: Server,
): Response | Promise<Response> => {
	const url = new URL(request.url);
	if (request.method === "OPTIONS") return corsPreflight();
	if (url.pathname.startsWith("/api")) return api(request).then(addCors);
	return addCors(notFound());
};

/**
 * Initialize the server
 */
initializeServer();
