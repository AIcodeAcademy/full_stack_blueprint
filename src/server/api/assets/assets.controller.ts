import type { Asset } from "@/server/domain/asset.type";
import type { Raw } from "@/server/shared/sql.type";
import { getBody, validateUserId } from "@server/shared/request.utils";
import { ok } from "@server/shared/response.utils";
import type { AssetPostRequest } from "./asset-post-request.type";
import type { AssetResponse } from "./asset-response.type";
import { insertAsset } from "./assets.repository";

export const assetsRoutes = {
	POST: async (request: Request) => await postAsset(request),
};

const postAsset = async (request: Request): Promise<Response> => {
	const userId = validateUserId(request);
	const body: AssetPostRequest = await getBody<AssetPostRequest>(request);
	const rawAsset: Raw<Asset> = {
		...body,
		userId,
		acquisitionDate: new Date(body.acquisitionDate),
	};
	const asset: Asset = insertAsset(rawAsset);
	const assetResponse: AssetResponse = {
		id: asset.id,
		categoryId: asset.categoryId,
		categoryName: asset.categoryName || "",
		value: asset.value,
		quantity: asset.quantity,
		acquisitionDate: asset.acquisitionDate.toISOString(),
		createdAt: asset.createdAt.toISOString(),
		updatedAt: asset.updatedAt.toISOString(),
	};
	return ok<AssetResponse>(assetResponse);
};
