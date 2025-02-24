export type Category = {
	id: string; // Unique identifier
	name: string; // Display name
	risk_level: string; // Risk classification
	liquidity: string; // Liquidity classification
};

export const NULL_CATEGORY = {
	id: "",
	name: "",
	risk_level: "",
	liquidity: "",
};
