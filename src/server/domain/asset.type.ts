export type Asset = {
	id: number;
	user_id: number;
	category_id: number;
	value: number;
	quantity: number;
	acquisition_date: string;
};

export const NULL_ASSET: Asset = {
	id: 0,
	user_id: 0,
	category_id: 0,
	value: 0,
	quantity: 0,
	acquisition_date: "",
};
