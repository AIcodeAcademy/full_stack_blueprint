import { ok } from "@/server/shared/response.utils";
import { selectAllCategories } from "./categories.repository";
import type { CategoryResponse } from "./category-response.type";

export const categoryRoutes = {
	GET: async (request: Request): Promise<Response> => {
		const categories = await selectAllCategories();

		const response: CategoryResponse[] = categories.map((category) => ({
			id: category.id,
			name: category.name,
			risk_level: category.risk_level,
			liquidity_level: category.liquidity_level,
			created_at: category.created_at,
		}));

		return ok<CategoryResponse[]>(response);
	},
};
