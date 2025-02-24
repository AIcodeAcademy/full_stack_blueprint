import { ok } from "@server/shared/response.utils";
import { selectAllCategories } from "./categories.repository";
import type { CategoryResponse } from "./category-response.type";

export const categoriesRoutes = {
	GET: async (request: Request) => await getCategories(request),
};

const getCategories = async (request: Request): Promise<Response> => {
	const categories = await selectAllCategories();
	const categoriesResponse: CategoryResponse[] = categories.map((category) => ({
		id: category.id,
		name: category.name,
		risk: category.risk,
		liquidity: category.liquidity,
		createdAt: category.createdAt.toISOString(),
		updatedAt: category.updatedAt.toISOString(),
	}));
	return ok<CategoryResponse[]>(categoriesResponse);
};
