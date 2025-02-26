import type { Asset } from "@/server/domain/assets.type";
import { guardGetBody, guardGetUserId } from "@/server/shared/request.utils";
import { ok } from "@/server/shared/response.utils";
import type { Raw } from "@/server/shared/sql.type";
import type { AssetPostRequest } from "./asset-post-request.type";
import type { AssetResponse } from "./asset-response.type";
import { insertAsset } from "./assets.repository";

/**
 * Routes controller for /api/assets
 * - POST: Create a new asset
 * @description Object that wires the request to the correct controller
 */
export const assetRoutes = {
	POST: async (request: Request): Promise<Response> => await postAsset(request),
};

const postAsset = async (request: Request): Promise<Response> => {
	const userId = guardGetUserId(request);
	const assetPostRequest = await guardGetBody<AssetPostRequest>(request);

	const rawAsset: Raw<Asset> = {
		...assetPostRequest,
		user_id: userId,
	};
	const asset = insertAsset(rawAsset);

	const response: AssetResponse = asset as AssetResponse;
	return ok<AssetResponse>(response);
};
