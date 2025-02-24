import { validateUserId } from "@server/shared/request.utils";
import { ok } from "@server/shared/response.utils";
import { selectAllCategories } from "./categories.repository";

export const categoriesRoutes = {
	GET: async (request: Request) => await getCategories(request),
};

const getCategories = async (request: Request): Promise<Response> => {
	const userId = validateUserId(request);
	const categories = await selectAllCategories();
	return ok(categories);
};
