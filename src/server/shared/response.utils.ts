import type { ApiError } from "./api-error.type";
import { AppError } from "./app-error.class";
import { debug } from "./log.utils";

/**
 * Creates a successful response with status 200
 * @param body - Response body data
 * @returns Response object with JSON stringified body
 */
export const ok = <T>(body: T): Response => {
	const responseBody = JSON.stringify(body);
	return addCors(
		new Response(responseBody, {
			status: 200,
			headers: { "Content-Type": "application/json" },
		}),
	);
};

/**
 * Creates a bad request response with status 400
 * @param message - Optional error message
 * @returns Response object with error message
 */
export const badRequest = (message = "Bad request"): Response => {
	return addCors(new Response(message, { status: 400 }));
};

/**
 * Creates an unauthorized response with status 401
 * @param message - Optional error message
 * @returns Response object with error message
 */
export const unauthorized = (message = "Unauthorized"): Response => {
	return addCors(new Response(message, { status: 401 }));
};

/**
 * Creates a forbidden response with status 403
 * @param message - Optional error message
 * @returns Response object with error message
 */
export const forbidden = (message = "Forbidden"): Response => {
	return addCors(new Response(message, { status: 403 }));
};

/**
 * Creates a not found response with status 404
 * @param message - Optional error message
 * @returns Response object with error message
 */
export const notFound = (message = "Not found"): Response => {
	return addCors(new Response(message, { status: 404 }));
};
/**
 * Creates a method not allowed response with status 405
 * @param message - Optional error message
 * @returns Response object with error message
 */
export const methodNotAllowed = (message = "Method not allowed"): Response => {
	return addCors(new Response(message, { status: 405 }));
};

/**
 * Creates an internal server error response with status 500
 * @param message - Optional error message
 * @returns Response object with error message
 */
export const internalServerError = (
	message = "Internal server error",
): Response => {
	return addCors(new Response(message, { status: 500 }));
};

/**
 * Handles an unknown error and returns an internal server error response
 * @param error - The error to handle
 * @returns Response object with error message
 */
export const handleInternalError = (error: Error): Response => {
	const message = error.message || "Unknown error";
	const stack = error.stack || "unknown stack";
	let code = 500;
	if (error instanceof AppError) {
		code = error.kind === "DATABASE" ? 500 : 400;
	} else if (error as ApiError) {
		code = (error as ApiError).code;
	}
	debug(`API error ${code} ${message}`, stack);
	switch (code) {
		case 400:
			return badRequest(message);
		case 401:
			return unauthorized(message);
		case 403:
			return forbidden(message);
		case 404:
			return notFound(message);
		case 405:
			return methodNotAllowed(message);
		default:
			return internalServerError(message);
	}
};

/**
 * Creates a CORS options response
 * @param request - The request
 * @returns Response object with CORS headers
 */
export const corsPreflight = (request: Request): Response => {
	debug("CORS preflight", request.url);
	return new Response(null, {
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
		},
	});
};

const addCors = (response: Response): Response => {
	response.headers.set("Access-Control-Allow-Origin", "*");
	return response;
};
