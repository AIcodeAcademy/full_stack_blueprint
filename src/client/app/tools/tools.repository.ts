import type { Tool } from "@/client/domain/tool.type";
import { get } from "@/client/shared/fetch.utils";

const API_URL = "/api/tools";

/**
 * Get the tools from the API
 * @returns The tools or an empty array if the response is not successful
 */
export const getTools = async (): Promise<Tool[]> => {
	const result = await get<Tool[]>(API_URL);
	if (result.value) return result.value;
	if (result.error) {
		console.error(result.error);
		// no error handling for now
	}
	return [];
};
