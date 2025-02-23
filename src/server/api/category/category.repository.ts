import type { Category } from "../../domain/category.type";
import { readCommands, selectAll } from "../../shared/sql.utils";

const categorySql = await readCommands("category");

export const getAllCategories = (): Category[] => {
	const results = selectAll<Category>(categorySql.SELECT_ALL);
	return results || [];
};
