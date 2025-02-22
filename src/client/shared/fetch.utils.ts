import type { UserToken } from "../domain/user-token.type";
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
	const body = JSON.stringify(payload);
	const headers = createHeaders();
	const options = { headers, method: "POST", body };
	const response = await fetch(API_URL + url, options);
	return createResult<T>(response);
};

/**
 * Makes a GET request to the specified URL
 * @param url - The endpoint URL
 * @returns Promise resolving to a ResponseBody containing the response data or error
 */
export const get = async <T>(url: string): Promise<ResponseBody<T>> => {
	const headers = createHeaders();
	const options = { headers, method: "GET" };
	const response = await fetch(API_URL + url, options);
	return createResult<T>(response);
};

/**
 * Response structure for API requests. Avoids error handling in the caller. Only checks for status code and body or error content.
 * @template T - The type of the response body data expected
 * @property {T} body - The response body data if the request is successful
 * @property {string} error - The error message of the response if the request is not successful
 * @property {number} status - The status code of the response
 */
export type ResponseBody<T> = {
	body?: T;
	error?: string;
	status: number;
};

async function createResult<T>(response: Response): Promise<ResponseBody<T>> {
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
}

const createHeaders = (): HeadersInit => {
	const storageToken = localStorage.getItem("userToken") || "";
	const userToken: UserToken = storageToken ? JSON.parse(storageToken) : null;
	const headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${userToken ? userToken.token : ""}`,
	};
	return headers;
};
