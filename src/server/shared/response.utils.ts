import type { ApiError } from "../domain/api-error.type";
import { debug } from "./log.utils";

/**
 * Creates a successful response with status 200
 * @param body - Response body data
 * @returns Response object with JSON stringified body
 */
export const ok = <T>(body: T): Response => {
	const responseBody = JSON.stringify(body);
	return new Response(responseBody);
};

/**
 * Creates a bad request response with status 400
 * @param message - Optional error message
 * @returns Response object with error message
 */
export const badRequest = (message = "Bad request"): Response => {
	return new Response(message, { status: 400 });
};

/**
 * Creates an unauthorized response with status 401
 * @param message - Optional error message
 * @returns Response object with error message
 */
export const unauthorized = (message = "Unauthorized"): Response => {
	return new Response(message, { status: 401 });
};

/**
 * Creates a forbidden response with status 403
 * @param message - Optional error message
 * @returns Response object with error message
 */
export const forbidden = (message = "Forbidden"): Response => {
	return new Response(message, { status: 403 });
};

/**
 * Creates a not found response with status 404
 * @param message - Optional error message
 * @returns Response object with error message
 */
export const notFound = (request: Request, message = "Not found"): Response => {
	debug(`API 404 ${request.url}`, message);
	return new Response(message, { status: 404 });
};
/**
 * Creates a method not allowed response with status 405
 * @param message - Optional error message
 * @returns Response object with error message
 */
export const methodNotAllowed = (message = "Method not allowed"): Response => {
	return new Response(message, { status: 405 });
};

/**
 * Creates an internal server error response with status 500
 * @param message - Optional error message
 * @returns Response object with error message
 */
export const internalServerError = (
	message = "Internal server error",
): Response => {
	return new Response(message, { status: 500 });
};

/**
 * Handles an unknown error and returns an internal server error response
 * @param error - The error to handle
 * @returns Response object with error message
 */
export const handleInternalError = (
	request: Request,
	error: Error,
): Response => {
	const errorData = {
		message: error.message || "Unknown error",
		stack: error.stack || error.name || "unknown stack",
		code: (error as ApiError).code || 500,
	};
	debug(`API error ${request.url}`, errorData.code);
	switch (errorData.code) {
		case 401:
			return unauthorized(errorData.message);
		case 403:
			return forbidden(errorData.message);
		case 404:
			return notFound(request, errorData.message);
		case 405:
			return methodNotAllowed(errorData.message);
		default:
			return internalServerError(errorData.message);
	}
};

/**
 * Creates a CORS options response
 * @param request - The request
 * @returns Response object with CORS headers
 */
export const corsPreflight = (): Response => {
	return new Response(null, {
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
		},
	});
};

/**
 * Adds CORS headers to the response
 * @param response - The response
 * @returns The response with CORS headers
 */
export const addCors = (response: Response): Response => {
	response.headers.set("Access-Control-Allow-Origin", "*");
	return response;
};
