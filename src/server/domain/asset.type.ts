import { AppError } from "../shared/app-error.class";

/**
 * Represents an asset with its properties
 */
export type Asset = {
	id: number;
	categoryId: number;
	value: number;
	quantity: number;
	acquisitionDate: Date;
	userId: number;
	createdAt: Date;
	updatedAt: Date;
	// Optional joined fields
	categoryName?: string;
};

/**
 * Default empty asset object
 */
export const NULL_ASSET: Asset = {
	id: 0,
	categoryId: 0,
	value: 0,
	quantity: 0,
	acquisitionDate: new Date(),
	userId: 0,
	createdAt: new Date(),
	updatedAt: new Date(),
};

/**
 * Validates an asset
 * @param asset - The asset to validate
 * @throws BAD_REQUEST_ERROR if the asset is invalid
 */
export const validateAsset = (asset: Partial<Asset>): void => {
	if (
		!asset.categoryId ||
		!asset.value ||
		!asset.quantity ||
		!asset.acquisitionDate ||
		!asset.userId
	) {
		throw new AppError(
			"Invalid asset: categoryId, value, quantity, acquisitionDate and userId are required",
			"LOGIC",
		);
	}

	if (asset.value <= 0) {
		throw new AppError("Invalid asset: value must be greater than 0", "LOGIC");
	}

	if (asset.quantity <= 0) {
		throw new AppError(
			"Invalid asset: quantity must be greater than 0",
			"LOGIC",
		);
	}

	if (asset.acquisitionDate > new Date()) {
		throw new AppError(
			"Invalid asset: acquisitionDate cannot be in the future",
			"LOGIC",
		);
	}
};
