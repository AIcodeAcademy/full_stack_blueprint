import { type Asset, validateAsset } from "@/server/domain/asset.type";
import type { Raw } from "@/server/shared/sql.type";
import { insert, readCommands, selectById } from "@server/shared/sql.utils";
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

export const insertAsset = (assetToInsert: Raw<Asset>): Asset => {
	validateAsset(assetToInsert);
	const assetId = insert<Raw<Asset>>(assetsSql.INSERT, assetToInsert);
	const asset = selectById<Asset>(assetsSql.SELECT_BY_ID, assetId);
	return asset || NULL_ASSET;
};
