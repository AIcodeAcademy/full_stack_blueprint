import { type Asset, NULL_ASSET } from "../../domain/asset.type";
import type { Category } from "../../domain/category.type";
import { get, post } from "../../shared/fetch.utils";

export const postAsset = async (asset: Asset): Promise<Asset | null> => {
	asset.name = Math.random().toString(36).substring(2, 15);
	const response = await post<Asset>("/api/assets", asset);
	return response.body || NULL_ASSET;
};

export const getCategories = async (): Promise<Category[]> => {
	const response = await get<Category[]>("/api/categories");
	return response.body || [];
};
