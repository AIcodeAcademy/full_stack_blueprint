import { AppError } from "../shared/app-error.class";
import type { Raw } from "../shared/sql.type";

export type Asset = {
	id: number;
	user_id: number;
	category_id: number;
	name: string;
	value: number;
	quantity: number;
	acquisition_date: string;
	created_at: string;
};

export const NULL_ASSET: Asset = {
	id: 0,
	user_id: 0,
	category_id: 0,
	name: "",
	value: 0,
	quantity: 0,
	acquisition_date: new Date().toISOString(),
	created_at: new Date().toISOString(),
};

export function validate(asset: Raw<Asset>): void {
	if (!asset.name || typeof asset.name !== "string") {
		throw new AppError("Invalid asset name", "LOGIC");
	}

	if (!asset.user_id || typeof asset.user_id !== "number") {
		throw new AppError("Invalid user id", "LOGIC");
	}

	if (!asset.category_id) {
		throw new AppError("Invalid category id", "LOGIC");
	}

	if (!asset.value || typeof asset.value !== "number" || asset.value <= 0) {
		throw new AppError("Invalid asset value", "LOGIC");
	}

	if (
		!asset.quantity ||
		typeof asset.quantity !== "number" ||
		asset.quantity <= 0
	) {
		throw new AppError("Invalid asset quantity", "LOGIC");
	}

	if (
		!asset.acquisition_date ||
		Number.isNaN(Date.parse(asset.acquisition_date))
	) {
		throw new AppError("Invalid acquisition date", "LOGIC");
	}
}
