export const ok = <T>(body: T): Response => {
	return new Response(JSON.stringify(body), { status: 200 });
};

export const badRequest = (message = "Bad request"): Response => {
	return new Response(message, { status: 400 });
};

export const notFound = (message = "Not found"): Response => {
	return new Response(message, { status: 404 });
};

export const unauthorized = (message = "Unauthorized"): Response => {
	return new Response(message, { status: 401 });
};

export const forbidden = (message = "Forbidden"): Response => {
	return new Response(message, { status: 403 });
};

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
