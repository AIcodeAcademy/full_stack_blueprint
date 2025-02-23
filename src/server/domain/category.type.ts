export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";
export type Liquidity = "LOW" | "MEDIUM" | "HIGH";

export type Category = {
	id: number;
	name: string;
	risk_level: RiskLevel;
	liquidity: Liquidity;
};

export const NULL_CATEGORY: Category = {
	id: 0,
	name: "",
	risk_level: "LOW",
	liquidity: "LOW",
};

export interface CategoryCreate {
	name: string;
	risk_level: RiskLevel;
	liquidity: Liquidity;
}
