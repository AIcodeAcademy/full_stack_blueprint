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
 * Creates a not found response with status 404
 * @param message - Optional error message
 * @returns Response object with error message
 */
export const notFound = (message = "Not found"): Response => {
	return new Response(message, { status: 404 });
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
 * Creates a method not allowed response with status 405
 * @param message - Optional error message
 * @returns Response object with error message
 */
export const methodNotAllowed = (message = "Method not allowed"): Response => {
	return new Response(message, { status: 405 });
};

export const internalServerError = (
	message = "Internal server error",
): Response => {
	return new Response(message, { status: 500 });
};

export const handleInternalError = (error: unknown): Response => {
	const errorData = {
		message: "Unknown error",
		stack: "unknown stack",
	};
	if (error instanceof Error) {
		errorData.message = error.message;
		errorData.stack = error.stack || error.name;
	}
	console.error(errorData);
	return internalServerError(errorData.message);
};
