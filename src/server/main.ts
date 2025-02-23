import { apiRoutes } from "./api/api.controller";
import { initializeTables } from "./shared/initialize.utils";
import { debug } from "./shared/log.utils";
import { internalServerError } from "./shared/response.utils";

const initializeServer = () => {
	initializeTables();
	const bunServer = Bun.serve({
		development: true,
		routes: apiRoutes,
		error(error) {
			debug("Server error", error);
			return internalServerError(error.message);
		},
	});
	debug("Server ready", bunServer.url.href);
};

/**
 * Initialize the server
 */
initializeServer();
