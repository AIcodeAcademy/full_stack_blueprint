import { BAD_REQUEST_ERROR } from "../shared/api-error.type";
import type { Asset } from "./asset.type";
import type { Tool } from "./tool.type";
import type { User } from "./user.type";

/**
 * Validates a tool
 * @param tool - The tool to validate
 * @throws BAD_REQUEST_ERROR if the tool is invalid
 */
export const validateTool = (tool: Partial<Tool>): void => {
	if (!tool.name || !tool.description || !tool.url) {
		throw BAD_REQUEST_ERROR;
	}
};

/**
 * Validates a user
 * @param user - The user to validate
 * @throws BAD_REQUEST_ERROR if the user is invalid
 */
export const validateUser = (user: Partial<User>): void => {
	if (!user.email || !user.password) {
		throw BAD_REQUEST_ERROR;
	}
};

/**
 * Validates an asset
 * @param asset - The asset to validate
 * @throws BAD_REQUEST_ERROR if the asset is invalid
 */
export const validateAsset = (asset: Partial<Asset>): void => {
	if (!asset.category_id) {
		throw new Error("Category is required");
	}
	if (!asset.value || asset.value <= 0) {
		throw new Error("Value must be greater than 0");
	}
	if (!asset.quantity || asset.quantity <= 0) {
		throw new Error("Quantity must be greater than 0");
	}
	if (!asset.acquisition_date) {
		throw new Error("Acquisition date is required");
	}
	// Validate date format
	if (Number.isNaN(Date.parse(asset.acquisition_date))) {
		throw new Error("Invalid acquisition date format");
	}
};
