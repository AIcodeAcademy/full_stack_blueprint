import { corsPreflight } from "../shared/response.utils";
import { assetRoutes } from "./assets/assets.controller";
import { authRoutes } from "./auth/auth.controller";
import { categoryRoutes } from "./categories/categories.controller";
import { toolsRoutes } from "./tools/tools.controller";

export const apiRoutes = {
	"/api/*": {
		OPTIONS: (request: Request) => corsPreflight(request),
	},
	"/api/auth/:action": authRoutes,
	"/api/tools": toolsRoutes,
	"/api/assets": assetRoutes,
	"/api/categories": categoryRoutes,
};
