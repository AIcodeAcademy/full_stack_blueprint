export interface Asset {
	id: number;
	user_id: number;
	category_id: number;
	value: number;
	quantity: number;
	acquisition_date: string;
}

export interface AssetCreate {
	user_id: number;
	category_id: number;
	value: number;
	quantity: number;
	acquisition_date: string;
}
