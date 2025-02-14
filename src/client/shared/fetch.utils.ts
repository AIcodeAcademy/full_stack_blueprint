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
	const response = await fetch(url, { ...postOptions, body });
	return createResult<T>(response);
};

/**
 * Makes a GET request to the specified URL
 * @param url - The endpoint URL
 * @returns Promise resolving to a ResponseBody containing the response data or error
 */
export const get = async <T>(url: string): Promise<ResponseBody<T>> => {
	const response = await fetch(url);
	return createResult<T>(response);
};

/**
 * Standard response body structure for API requests
 * @template T - The type of the response body data
 */
export type ResponseBody<T> = {
	body?: T;
	status: number;
	error?: string;
};

async function createResult<T>(response: Response): Promise<ResponseBody<T>> {
	const result = {
		body: response.status < 400 ? await response.json() : undefined,
		status: response.status,
		error: response.status >= 400 ? await response.text() : undefined,
	};
	return result;
}

const headers = {
	"Content-Type": "application/json",
};

const postOptions = {
	method: "POST",
	headers,
};
