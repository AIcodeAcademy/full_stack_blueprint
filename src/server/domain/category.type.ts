export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";
export type Liquidity = "LOW" | "MEDIUM" | "HIGH";

export interface Category {
	id: number;
	name: string;
	risk_level: RiskLevel;
	liquidity: Liquidity;
}

export interface CategoryCreate {
	name: string;
	risk_level: RiskLevel;
	liquidity: Liquidity;
}
