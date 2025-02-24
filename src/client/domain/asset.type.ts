export type Asset = {
	id: string; // Unique identifier
	category_id: string; // Reference to category
	value: number; // Asset monetary value
	quantity: number; // Asset quantity/units
	acquisition_date: string; // ISO date string
	user_id: string; // Owner of the asset
};

export const NULL_ASSET = {
	id: "",
	category_id: "",
	value: 0,
	quantity: 0,
	acquisition_date: "",
	user_id: "",
};

export const validateAsset = (data: Partial<Asset>): boolean => {
	// Category must be selected
	if (!data.category_id) return false;
	// Value must be positive number
	if (!data.value || data.value <= 0) return false;
	// Quantity must be positive number
	if (!data.quantity || data.quantity <= 0) return false;
	// Date must be valid ISO string
	if (!data.acquisition_date || isNaN(Date.parse(data.acquisition_date)))
		return false;
	return true;
};
