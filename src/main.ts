import homepage from "./client/index.html";

const serverOptions = {
	development: true,
	static: {
		"/": homepage,
	},
	fetch(request: Request) {
		return new Response(homepage);
	},
};

const bunServer = Bun.serve(serverOptions);
const serverUrl = `http://${bunServer.hostname}:${bunServer.port}`;
console.log(`Server running at ${serverUrl}`);
