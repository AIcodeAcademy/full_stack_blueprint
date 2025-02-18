import type { Tool } from "../../domain/tool.type";
import { get } from "../../shared/fetch.utils";

const API_URL = "/api/tools";

export const getTools = async (): Promise<Tool[]> => {
	const response = await get<Tool[]>(API_URL);
	if (response.error) throw response.body;
	return response.body as Tool[];
};
