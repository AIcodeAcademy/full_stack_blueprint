import type { Tool } from "../../domain/tool.type";
import { get } from "../../shared/fetch.utils";

const API_URL = "/api/tools";

/**
 * Get the tools from the API
 * @returns The tools or an empty array if the response is not successful
 */
export const getTools = async (): Promise<Tool[]> => {
	const response = await get<Tool[]>(API_URL);
	if (response.body) return response.body;
	return [];
};
