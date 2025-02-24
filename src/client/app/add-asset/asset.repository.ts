import type { Asset } from "../../domain/asset.type";
import { post } from "../../shared/fetch.utils";
import type { Result } from "../../shared/result.type";

export const createAsset = async (
	asset: Omit<Asset, "id">,
): Promise<Result<Asset>> => {
	try {
		const response = await post<Asset>("/api/assets", asset);
		return { ok: true, data: response.body };
	} catch (error) {
		console.error("Error in createAsset:", error);
		return { ok: false, error: "Failed to create asset" };
	}
};
