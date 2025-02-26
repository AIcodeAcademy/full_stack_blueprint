import { BaseRepository } from "../../shared/base-repository";

/**
 * Type for application info
 */
export interface AppInfo {
	name: string;
	version: string;
	features: string[];
}

/**
 * Repository for home page data
 */
export class HomeRepository extends BaseRepository<AppInfo> {
	protected endpoint = "/api/app-info";

	/**
	 * Get application info
	 * For now, this returns mocked data as the API endpoint doesn't exist yet
	 */
	async getAppInfo(): Promise<AppInfo> {
		// In a real app, we would fetch this from an API
		// return this.apiCall(() => get<AppInfo>(this.endpoint));

		// For demo purposes, we'll return mock data
		return {
			name: "Fullstack Blueprint",
			version: "1.0.0",
			features: ["Authentication", "Asset Management", "Tools Management"],
		};
	}
}

// Create singleton instance
export const homeRepository = new HomeRepository();
