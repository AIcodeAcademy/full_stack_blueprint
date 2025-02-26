import type { ResponseBody } from "./fetch.utils";
import { get, post } from "./fetch.utils";

/**
 * Base Repository class for standardizing API interactions
 *
 * This base class provides:
 * 1. Standard CRUD operations
 * 2. Consistent error handling
 * 3. Type-safe API calls
 */
export abstract class BaseRepository<T> {
	/**
	 * API endpoint for this repository
	 */
	protected abstract endpoint: string;

	/**
	 * Get all items from the API
	 */
	async getAll(): Promise<T[]> {
		const result = await get<T[]>(this.endpoint);
		return result.body || [];
	}

	/**
	 * Get a single item by ID
	 */
	async getById(id: string): Promise<T | null> {
		const result = await get<T>(`${this.endpoint}/${id}`);
		return result.body || null;
	}

	/**
	 * Create a new item
	 */
	async create(item: Partial<T>): Promise<T | null> {
		const result = await post<T>(this.endpoint, item);
		return result.body || null;
	}

	/**
	 * Update an existing item
	 */
	async update(id: string, item: Partial<T>): Promise<T | null> {
		const result = await post<T>(`${this.endpoint}/${id}`, item);
		return result.body || null;
	}

	/**
	 * Delete an item
	 */
	async delete(id: string): Promise<boolean> {
		const result = await post<void>(`${this.endpoint}/${id}/delete`, {});
		return result.status < 400;
	}

	/**
	 * Custom API call with proper error handling
	 */
	protected async apiCall<R>(
		method: () => Promise<ResponseBody<R>>,
	): Promise<R | null> {
		try {
			const result = await method();
			return result.body || null;
		} catch (error) {
			console.error("API call failed:", error);
			return null;
		}
	}
}
