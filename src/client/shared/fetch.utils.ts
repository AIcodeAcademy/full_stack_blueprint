import type { UserToken } from "@client/domain/user-token.type";

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
	console.log("options", options);
	const response = await fetch(url, options);
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
	console.log("options", options);
	const response = await fetch(url, options);
	return createResult<T>(response);
};

/**
 * Standard response body structure for API requests
 * @template T - The type of the response body data
 */
export type ResponseBody<T> = {
	body: T | string;
	status: number;
	error: boolean;
};

async function createResult<T>(response: Response): Promise<ResponseBody<T>> {
	if (response.status >= 400) {
		return {
			status: response.status,
			error: true,
			body: await response.text(),
		};
	}
	return {
		status: response.status,
		error: false,
		body: (await response.json()) as T,
	};
}

const createHeaders = (): HeadersInit => {
	const storageToken = localStorage.getItem("userToken") || "";
	console.log("storageToken", storageToken);
	const userToken: UserToken = storageToken ? JSON.parse(storageToken) : null;
	console.log("userToken", userToken);
	const headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${userToken ? userToken.token : ""}`,
	};
	console.log("headers", headers);
	return headers;
};
