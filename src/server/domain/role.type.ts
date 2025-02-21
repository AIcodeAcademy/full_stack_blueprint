export type Role = {
	id: number;
	name: string;
	description: string;
};

export const NULL_ROLE: Role = {
	id: 0,
	name: "",
	description: "",
};
