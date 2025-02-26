import type { Category } from "@/server/domain/categories.type";
import { readCommands, selectAll } from "@/server/shared/sql.utils";

const categorySql = await readCommands("categories");

/**
 * Selects all categories
 * @returns Array of categories
 */
export const selectAllCategories = (): Category[] => {
	return selectAll<Category>(categorySql.SELECT_ALL);
};
