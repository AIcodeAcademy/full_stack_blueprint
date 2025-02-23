import type { Asset } from "../../domain/asset.type";
import { insert, readCommands, select } from "../../shared/sql.utils";

const assetSql = await readCommands("asset");

export const insertAsset = (asset: Omit<Asset, "id">): Asset => {
	const id = insert<Omit<Asset, "id">>(assetSql.INSERT, asset);
	return { ...asset, id };
};

export const selectAssetsByUserId = (userId: number): Asset[] => {
	const results = select<{ user_id: number }, Asset[]>(
		assetSql.SELECT_BY_USER_ID,
		{
			user_id: userId,
		},
	);
	return results || [];
};
