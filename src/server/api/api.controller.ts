import { corsPreflight } from "../shared/response.utils";
import { assetRoutes } from "./asset/asset.controller";
import { authRoutes } from "./auth/auth.controller";
import { categoryRoutes } from "./category/category.controller";
import { toolsRoutes } from "./tools/tools.controller";

export const apiRoutes = {
	"/api/*": {
		OPTIONS: (request: Request) => corsPreflight(request),
	},
	"/api/auth/:action": authRoutes,
	"/api/tools": toolsRoutes,
	"/api/categories": categoryRoutes,
	"/api/assets": assetRoutes,
};
