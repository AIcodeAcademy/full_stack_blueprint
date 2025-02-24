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
			created_at: new Date().toISOString(),
		};

		const asset = await insertAsset(rawAsset);

		const response: AssetResponse = {
			id: asset.id,
			user_id: asset.user_id,
			category_id: asset.category_id,
			name: asset.name,
			value: asset.value,
			quantity: asset.quantity,
			acquisition_date: asset.acquisition_date,
			created_at: asset.created_at,
		};

		return ok<AssetResponse>(response);
	},
};
