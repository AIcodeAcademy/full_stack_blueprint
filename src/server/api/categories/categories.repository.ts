import type { Category } from "@/server/domain/categories.type";
import { readCommands, selectAll } from "@/server/shared/sql.utils";

const categorySql = await readCommands("categories");

export async function selectAllCategories(): Promise<Category[]> {
	return await selectAll<Category>(categorySql.SELECT_ALL);
}
