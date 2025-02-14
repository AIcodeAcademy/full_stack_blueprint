import type { Server } from "bun";
import { api } from "./api/api.controller";
import { initializeToolsTable } from "./api/tools/tools.repository";
import { notFound } from "./shared/response.utils";

export const initialize = () => {
	initializeToolsTable();
	console.log("Server initialized");
};

export const processRequest = (
	request: Request,
	server: Server,
): Response | Promise<Response> => {
	const url = new URL(request.url);
	if (url.pathname.startsWith("/api")) return api(request);
	return notFound();
};
