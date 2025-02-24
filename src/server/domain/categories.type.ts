import { AppError } from "../shared/app-error.class";
import type { Raw } from "../shared/sql.type";

export type Category = {
	id: number;
	name: string;
	risk_level: "LOW" | "MEDIUM" | "HIGH";
	liquidity_level: "LOW" | "MEDIUM" | "HIGH";
	created_at: string;
};

export const NULL_CATEGORY: Category = {
	id: 0,
	name: "",
	risk_level: "LOW",
	liquidity_level: "LOW",
	created_at: new Date().toISOString(),
};

export function validate(category: Raw<Category>): void {
	if (!category.name || typeof category.name !== "string") {
		throw new AppError("Invalid category name", "LOGIC");
	}

	const validLevels = ["LOW", "MEDIUM", "HIGH"];
	if (!validLevels.includes(category.risk_level)) {
		throw new AppError("Invalid risk level", "LOGIC");
	}

	if (!validLevels.includes(category.liquidity_level)) {
		throw new AppError("Invalid liquidity level", "LOGIC");
	}
}
