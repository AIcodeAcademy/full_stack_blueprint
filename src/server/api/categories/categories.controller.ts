import { ok } from "@/server/shared/response.utils";
import { selectAllCategories } from "./categories.repository";
import type { CategoryResponse } from "./category-response.type";

/**
 * Routes controller for /api/categories
 * - GET: Get all categories
 * @description Object that wires the request to the correct controller
 */
export const categoryRoutes = {
	GET: (request: Request): Response => getCategories(request),
};

const getCategories = (request: Request): Response => {
	const categories = selectAllCategories();

	const response: CategoryResponse[] = categories.map(
		(c) => c as CategoryResponse,
	);

	return ok<CategoryResponse[]>(response);
};
