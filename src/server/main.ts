import { apiRoutes } from "./api/api.controller";
import { initializeTables } from "./shared/initialize.utils";
import { debug } from "./shared/log.utils";
import { handleInternalError } from "./shared/response.utils";

const initializeServer = () => {
	initializeTables();
	const bunServer = Bun.serve({
		development: true,
		routes: apiRoutes,
		error(error) {
			return handleInternalError(error);
		},
	});
	debug("Server ready", bunServer.url.href);
};

/**
 * Initialize the server
 */
initializeServer();
