import type { UserToken } from "@/client/domain/user-token.type";
import type { ResponseBody } from "@/client/shared/response-body.type";

const API_URL = "http://localhost:3000";
/**
 * Makes a POST request to the specified URL
 * @param url - The endpoint URL
 * @param payload - The data to send in the request body
 * @returns Promise resolving to a ResponseBody containing the response data or error
 */
export const post = async <T>(
	url: string,
	payload: unknown,
): Promise<ResponseBody<T>> => {
	try {
		const body = JSON.stringify(payload);
		const headers = createHeaders();
		const options = { headers, method: "POST", body };
		const response = await fetch(API_URL + url, options);
		return createResult<T>(response);
	} catch (error) {
		console.error(`POST ${url}`, error);
		return {
			status: 599,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
};

/**
 * Makes a GET request to the specified URL
 * @param url - The endpoint URL
 * @returns Promise resolving to a ResponseBody containing the response data or error
 */
export const get = async <T>(url: string): Promise<ResponseBody<T>> => {
	try {
		const headers = createHeaders();
		const options = { headers, method: "GET" };
		const response = await fetch(API_URL + url, options);
		return createResult<T>(response);
	} catch (error) {
		console.error(`GET ${url}`, error);
		return {
			status: 599,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
};

async function createResult<T>(response: Response): Promise<ResponseBody<T>> {
	try {
		if (response.status >= 400) {
			return {
				status: response.status,
				error: await response.text(),
			};
		}
		return {
			status: response.status,
			body: (await response.json()) as T,
		};
	} catch (error) {
		return {
			status: 503,
			error: "Service unavailable - Please check if the server is running",
		};
	}
}

const createHeaders = (): HeadersInit => {
	const storageToken = localStorage.getItem("userToken") || "";
	const userToken: UserToken = storageToken ? JSON.parse(storageToken) : "";
	const headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${userToken.token}`,
	};
	return headers;
};
