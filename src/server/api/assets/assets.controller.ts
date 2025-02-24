import { getBody, validateUserId } from "@server/shared/request.utils";
import { ok } from "@server/shared/response.utils";
import type { AssetPostRequest } from "./asset-post-request.type";
import { insertAsset } from "./assets.repository";

export const assetsRoutes = {
	POST: async (request: Request) => await postAsset(request),
};

const postAsset = async (request: Request): Promise<Response> => {
	const userId = validateUserId(request);
	const body = await getBody<AssetPostRequest>(request);
	const asset = await insertAsset(body);
	return ok(asset);
};
