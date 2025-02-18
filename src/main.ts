import { initialize, processRequest } from "./server/server.bootstrap";
import { debug } from "./server/shared/log.utils";

const serverOptions = {
	development: true,
	/* static: {
		"/": homepage,
	}, */
	fetch: processRequest,
};

initialize();
const bunServer = Bun.serve(serverOptions);
debug("Server", bunServer);
