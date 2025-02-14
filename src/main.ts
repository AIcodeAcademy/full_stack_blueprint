import homepage from "./client/index.html";
import { initialize, processRequest } from "./server/server.bootstrap";

const serverOptions = {
	development: true,
	static: {
		"/": homepage,
	},
	fetch: processRequest,
};

initialize();
const bunServer = Bun.serve(serverOptions);
const serverUrl = `http://${bunServer.hostname}:${bunServer.port}`;
console.log(`Server running at ${serverUrl}`);
