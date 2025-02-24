import { readCommands, selectAll } from "@server/shared/sql.utils";
import type { CategoryResponse } from "./category-response.type";

const categoriesSql = await readCommands("categories");

export const selectAllCategories = (): CategoryResponse[] => {
	const results = selectAll<CategoryResponse>(categoriesSql.SELECT_ALL);
	return results || [];
};
