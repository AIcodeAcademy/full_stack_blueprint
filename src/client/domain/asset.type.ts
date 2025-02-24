export type Asset = {
	id: string; // Unique identifier for the asset
	category_id: string; // Reference to the category
	value: number; // Monetary value of the asset
	quantity: number; // Number of units
	acquisition_date: string; // ISO date string
	user_id: string; // Owner of the asset
};

export const NULL_ASSET: Asset = {
	id: "",
	category_id: "",
	value: 0,
	quantity: 0,
	acquisition_date: new Date().toISOString(),
	user_id: "",
};

export const validateAsset = (data: Partial<Asset>): boolean => {
	// Category must be selected
	if (!data.category_id?.trim()) return false;
	// Value must be positive number
	if (typeof data.value !== "number" || data.value <= 0) return false;
	// Quantity must be positive integer
	if (
		typeof data.quantity !== "number" ||
		data.quantity <= 0 ||
		!Number.isInteger(data.quantity)
	)
		return false;
	// Acquisition date must be valid ISO date
	if (
		!data.acquisition_date?.trim() ||
		isNaN(Date.parse(data.acquisition_date))
	)
		return false;
	return true;
};
