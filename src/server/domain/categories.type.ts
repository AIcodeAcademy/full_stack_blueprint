import { AppError } from "../shared/app-error.class";
import type { Raw } from "../shared/sql.type";

export type Category = {
	id: number;
	name: string;
	risk: string;
	liquidity: string;
	created_at: string;
	updated_at: string;
};

export const NULL_CATEGORY: Category = {
	id: 0,
	name: "",
	risk: "Low",
	liquidity: "Low",
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
};

/**
 * Validates a category
 * @param category - The category to validate
 * @throws AppError if the category is invalid
 */
export function validateCategory(category: Raw<Category>): void {
	if (!category.name || typeof category.name !== "string") {
		throw new AppError("Invalid category name", "LOGIC");
	}

	const validLevels = ["Low", "Medium", "High"];
	if (!category.risk || !validLevels.includes(category.risk)) {
		throw new AppError("Invalid risk level", "LOGIC");
	}

	if (!category.liquidity || !validLevels.includes(category.liquidity)) {
		throw new AppError("Invalid liquidity level", "LOGIC");
	}
}
