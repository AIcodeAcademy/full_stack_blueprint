import {
	BAD_REQUEST_ERROR,
	METHOD_NOT_ALLOWED_ERROR,
	UNAUTHORIZED_ERROR,
} from "./api-error.type";
import type { JwtData } from "./jwt-data.type";
import { verifyJWT } from "./jwt.utils";

/**
 * Retrieves the URL from the request object
 * @param request - The incoming request object
 * @returns The URL
 */
export const getUrl = (request: Request): URL => {
	return new URL(request.url);
};

/**
 * Retrieves the pathname from the request URL
 * @param request - The incoming request object
 * @returns The pathname
 */
export const getPath = (request: Request): string => {
	return getUrl(request).pathname;
};

/**
 * Retrieves the parameters from the request URL
 * @param request - The incoming request object
 * @returns The parameters as a record of key-value pairs
 */
export const getParams = (request: Request): Record<string, string> => {
	return Object.fromEntries(getUrl(request).searchParams.entries());
};

/**
 * Gets a parameter value from the request URL path
 * @param request - The incoming request object
 * @param key - Parameter key to retrieve
 * @param defaultValue - Value to return if parameter is not found
 * @returns The parameter value or default value
 */
export const getParam = (
	request: Request,
	key: string,
	defaultValue = "",
): string => {
	return getParams(request)[key] ?? defaultValue;
};

export const getSearchParams = (request: Request): URLSearchParams => {
	return getUrl(request).searchParams;
};

/**
 * Gets a query parameter value from the request URL
 * @param request - The incoming request object
 * @param key - Query parameter key to retrieve
 * @param defaultValue - Value to return if parameter is not found
 * @returns The query parameter value or default value
 */
export const getSearchParam = (
	request: Request,
	key: string,
	defaultValue = "",
): string => {
	return getSearchParams(request).get(key) ?? defaultValue;
};

/**
 * Ensures the body of a request is present
 * @param request - The incoming request object
 * @returns The parsed JSON object
 * @throws BAD_REQUEST_ERROR if the body is not found
 */
export const guardGetBody = async <T>(request: Request): Promise<T> => {
	const body = await request.json();
	if (!body) throw BAD_REQUEST_ERROR;
	return body as T;
};

/**
 * Sets the user ID in the request headers
 * @param request - The incoming request object
 */
export const setUserId = (request: Request): void => {
	const userId = extractUserId(request);
	request.headers.set("userId", userId.toString());
};

/**
 * Retrieves the user ID from the request headers
 * @param request - The incoming request object
 * @returns The user ID or 0 if not found
 */
export const getUserId = (request: Request): number => {
	const userId = request.headers.get("userId");
	return userId ? Number.parseInt(userId) : 0;
};

/**
 * Ensures the user ID is present in the request headers
 * @param request - The incoming request object
 * @returns The user ID
 * @throws UNAUTHORIZED_ERROR if the user ID is not found
 */
export const guardGetUserId = (request: Request): number => {
	const userId = extractUserId(request);
	if (userId === 0) throw UNAUTHORIZED_ERROR;
	return userId;
};

/**
 * Validates the POST request method
 * @param request - The incoming request object
 */
export const validatePostRequest = (request: Request): void => {
	if (request.method !== "POST") {
		throw METHOD_NOT_ALLOWED_ERROR;
	}
};

const extractAuthorization = (request: Request): string => {
	const authorization = request.headers.get("Authorization");
	const token = authorization ? authorization.split(" ")[1] : "";
	return token;
};

const extractUserId = (request: Request): number => {
	try {
		const token = extractAuthorization(request);
		const jwtData: JwtData = verifyJWT(token);
		return jwtData.userId;
	} catch (error) {
		return 0;
	}
};
