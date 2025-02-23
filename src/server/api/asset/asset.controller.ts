import { validateAsset } from "@/server/domain/validations.utils";
import { getBody, validateUserId } from "@/server/shared/request.utils";
import { ok } from "../../shared/response.utils";
import { insertAsset, selectAssetsByUserId } from "./asset.repository";
import type { CreateAssetRequest } from "./create-asset-request.type";

export const assetRoutes = {
	GET: async (request: Request) => {
		const userId = validateUserId(request);
		const assets = selectAssetsByUserId(userId);
		return ok(assets);
	},
	POST: async (request: Request) => {
		const userId = validateUserId(request);
		const bodyRequest = await getBody<CreateAssetRequest>(request);
		const newAsset = {
			user_id: userId,
			category_id: bodyRequest.category_id,
			value: bodyRequest.value,
			quantity: bodyRequest.quantity,
			acquisition_date: bodyRequest.acquisition_date,
		};
		validateAsset(newAsset);
		const asset = insertAsset(newAsset);
		return ok(asset);
	},
};
