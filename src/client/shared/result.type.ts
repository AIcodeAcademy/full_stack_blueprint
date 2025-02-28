/**
 * Response structure for API requests. Avoids error handling in the caller. Only checks for status code and body or error content.
 * @template T - The type of the response body data expected
 * @property {T} value - The response body data if the request is successful
 * @property {string} error - The error message of the response if the request is not successful
 * @property {number} status - The status code of the response
 */
export type Result<T> = {
	value?: T;
	error?: string;
	status: number;
};
