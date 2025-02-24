import type { Asset } from "@/server/domain/assets.type";
import { validate } from "@/server/domain/assets.type";
import type { Raw } from "@/server/shared/sql.type";
import { insert, readCommands, selectById } from "@/server/shared/sql.utils";

const assetSql = await readCommands("assets");

export async function insertAsset(assetToInsert: Raw<Asset>): Promise<Asset> {
	validate(assetToInsert);
	const assetId = await insert<Raw<Asset>>(assetSql.INSERT, assetToInsert);
	return await selectById<Asset>(assetSql.SELECT_BY_ID, assetId);
}
