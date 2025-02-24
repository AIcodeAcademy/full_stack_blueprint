export type Category = {
	id: string; // Unique identifier for the category
	name: string; // Display name
	risk_level: "LOW" | "MEDIUM" | "HIGH"; // Risk classification
	liquidity: "LOW" | "MEDIUM" | "HIGH"; // Liquidity classification
};

export const NULL_CATEGORY: Category = {
	id: "",
	name: "",
	risk_level: "LOW",
	liquidity: "LOW",
};
