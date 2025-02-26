import type { Asset } from "@/server/domain/assets.type";
import { validate } from "@/server/domain/assets.type";
import type { Raw } from "@/server/shared/sql.type";
import { insert, readCommands, selectById } from "@/server/shared/sql.utils";

const assetSql = await readCommands("assets");

/**
 * Inserts an asset
 * @param assetToInsert - The asset to insert
 * @returns The asset
 * @throws AppError if the asset is not valid
 */
export const insertAsset = (assetToInsert: Raw<Asset>): Asset => {
	validate(assetToInsert);
	const assetId = insert<Raw<Asset>>(assetSql.INSERT, assetToInsert);
	const asset = selectById<Asset>(assetSql.SELECT_BY_ID, assetId);
	return asset;
};
