import { corsPreflight } from "../shared/response.utils";
import { authRoutes } from "./auth/auth.controller";
import { toolsRoutes } from "./tools/tools.controller";

export const apiRoutes = {
	"/api/*": {
		OPTIONS: (request: Request) => corsPreflight(request),
	},
	"/api/auth/:action": authRoutes,
	"/api/tools": toolsRoutes,
};
