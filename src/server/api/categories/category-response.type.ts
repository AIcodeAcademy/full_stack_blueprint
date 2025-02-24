export type CategoryResponse = {
	id: number;
	name: string;
	risk_level: "LOW" | "MEDIUM" | "HIGH";
	liquidity_level: "LOW" | "MEDIUM" | "HIGH";
	created_at: string;
};
