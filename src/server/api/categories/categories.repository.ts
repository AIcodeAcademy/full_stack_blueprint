import type { Category } from "@/server/domain/category.type";
import { readCommands, selectAll } from "@server/shared/sql.utils";

const categoriesSql = await readCommands("categories");

export const selectAllCategories = (): Category[] => {
	const results = selectAll<Category>(categoriesSql.SELECT_ALL);
	return results || [];
};
