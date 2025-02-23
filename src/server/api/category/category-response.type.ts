import type { Liquidity, RiskLevel } from "../../domain/category.type";

export type CategoryResponse = {
	id: number;
	name: string;
	risk_level: RiskLevel;
	liquidity: Liquidity;
};
