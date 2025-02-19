import type { Server } from "bun";
import { api } from "./api/api.controller";
import { initializeUsersTable } from "./api/auth/auth.repository";
import { initializeToolsTable } from "./api/tools/tools.repository";
import { debug } from "./shared/log.utils";
import { addCors, corsPreflight, notFound } from "./shared/response.utils";

const initializeDb = () => {
	initializeToolsTable();
	initializeUsersTable();
	debug("Database", "initialized");
};

const initializeServer = () => {
	const bunServer = Bun.serve({
		development: true,
		fetch: processRequest,
	});
	debug("Server", bunServer);
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

initializeDb();
initializeServer();
