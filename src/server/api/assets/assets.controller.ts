import type { Asset } from "@/server/domain/assets.type";
import { getBody, validateUserId } from "@/server/shared/request.utils";
import { ok } from "@/server/shared/response.utils";
import type { Raw } from "@/server/shared/sql.type";
import type { AssetPostRequest } from "./asset-post-request.type";
import type { AssetResponse } from "./asset-response.type";
import { insertAsset } from "./assets.repository";

export const assetRoutes = {
	POST: async (request: Request): Promise<Response> => {
		const userId = await validateUserId(request);
		const body = await getBody<AssetPostRequest>(request);

		const rawAsset: Raw<Asset> = {
			...body,
			user_id: userId,
		};

		const asset = await insertAsset(rawAsset);

		const response: AssetResponse = asset as AssetResponse;

		return ok<AssetResponse>(response);
	},
};
