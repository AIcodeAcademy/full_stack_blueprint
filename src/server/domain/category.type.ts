import { AppError } from "../shared/app-error.class";

/**
 * Represents a category with its properties
 */
export type Category = {
	id: number;
	name: string;
	risk: "Low" | "Medium" | "High";
	liquidity: "Low" | "Medium" | "High";
	createdAt: Date;
	updatedAt: Date;
};

/**
 * Default empty category object
 */
export const NULL_CATEGORY: Category = {
	id: 0,
	name: "",
	risk: "Low",
	liquidity: "Low",
	createdAt: new Date(),
	updatedAt: new Date(),
};

/**
 * Validates a category
 * @param category - The category to validate
 * @throws BAD_REQUEST_ERROR if the category is invalid
 */
export const validateCategory = (category: Partial<Category>): void => {
	if (!category.name || !category.risk || !category.liquidity) {
		throw new AppError(
			"Invalid category: name, risk and liquidity are required",
			"LOGIC",
		);
	}

	const validRisks = ["Low", "Medium", "High"];
	const validLiquidity = ["Low", "Medium", "High"];

	if (
		!validRisks.includes(category.risk) ||
		!validLiquidity.includes(category.liquidity)
	) {
		throw new AppError(
			"Invalid category: risk and liquidity must be Low, Medium or High",
			"LOGIC",
		);
	}
};
