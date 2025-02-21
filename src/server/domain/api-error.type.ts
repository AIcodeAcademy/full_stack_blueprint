export type ApiError = Error & {
	code: number;
};

export const UNAUTHORIZED_ERROR: ApiError = {
	name: "Unauthorized",
	message: "Unauthorized",
	code: 401,
};

export const FORBIDDEN_ERROR: ApiError = {
	name: "Forbidden",
	message: "Forbidden",
	code: 403,
};

export const NOT_FOUND_ERROR: ApiError = {
	name: "NotFound",
	message: "Not found",
	code: 404,
};

export const BAD_REQUEST_ERROR: ApiError = {
	name: "BadRequest",
	message: "Bad request",
	code: 400,
};

export const METHOD_NOT_ALLOWED_ERROR: ApiError = {
	name: "MethodNotAllowed",
	message: "Method not allowed",
	code: 405,
};

export const INTERNAL_SERVER_ERROR: ApiError = {
	name: "InternalServerError",
	message: "Internal server error",
	code: 500,
};
