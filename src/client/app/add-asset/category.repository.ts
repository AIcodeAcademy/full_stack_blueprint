import type { Category } from "../../domain/category.type";
import { get } from "../../shared/fetch.utils";
import type { Result } from "../../shared/result.type";

export const getCategories = async (): Promise<Result<Category[]>> => {
	try {
		const response = await get<Category[]>("/api/categories");
		return { ok: true, data: response.body || [] };
	} catch (error) {
		console.error("Error in getCategories:", error);
		return { ok: false, error: "Failed to fetch categories" };
	}
};
