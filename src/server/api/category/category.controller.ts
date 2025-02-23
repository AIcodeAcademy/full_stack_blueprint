import { ok } from "@/server/shared/response.utils";
import { getAllCategories } from "./category.repository";

export const categoryRoutes = {
	GET: async (_request: Request) => {
		const categories = getAllCategories();
		return ok(categories);
	},
};
