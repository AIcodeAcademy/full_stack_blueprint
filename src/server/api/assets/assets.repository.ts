import type { Raw } from "@/server/shared/sql.type";
import { insert, readCommands, selectById } from "@server/shared/sql.utils";
import type { AssetPostRequest } from "./asset-post-request.type";
import type { AssetResponse } from "./asset-response.type";

const NULL_ASSET: AssetResponse = {
	id: 0,
	categoryId: 0,
	categoryName: "",
	value: 0,
	quantity: 0,
	acquisitionDate: "",
	createdAt: "",
	updatedAt: "",
};

const assetsSql = await readCommands("assets");

export const validateAsset = (asset: Raw<AssetPostRequest>): void => {
	if (!asset.categoryId || asset.categoryId <= 0) {
		throw new ApiError("BAD_REQUEST", "Invalid category id");
	}
	if (!asset.value || asset.value <= 0) {
		throw new ApiError("BAD_REQUEST", "Invalid value");
	}
	if (!asset.quantity || asset.quantity <= 0) {
		throw new ApiError("BAD_REQUEST", "Invalid quantity");
	}
	if (!asset.acquisitionDate) {
		throw new ApiError("BAD_REQUEST", "Invalid acquisition date");
	}
};

export const insertAsset = (
	assetToInsert: Raw<AssetPostRequest>,
): AssetResponse => {
	validateAsset(assetToInsert);
	const assetId = insert<Raw<AssetPostRequest>>(
		assetsSql.INSERT,
		assetToInsert,
	);
	const asset = selectById<AssetResponse>(assetsSql.SELECT_BY_ID, assetId);
	return asset || NULL_ASSET;
};
