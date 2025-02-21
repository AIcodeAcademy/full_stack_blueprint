import { UNAUTHORIZED_ERROR } from "../domain/api-error.type";
import type { JwtData } from "../domain/jwt-data.type";
import { verifyJWT } from "./jwt.utils";
import { debug } from "./log.utils";

export const getUrl = (request: Request): URL => {
	return new URL(request.url);
};

export const getPath = (request: Request): string => {
	return getUrl(request).pathname;
};

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

export const getBody = async (request: Request): Promise<unknown> => {
	return await request.json();
};

export const setUserId = (request: Request): void => {
	try {
		const userId = extractUserId(request);
		request.headers.set("userId", userId.toString());
	} catch (error) {
		debug("Error setting user ID", error);
	}
};

export const getUserId = (request: Request): number => {
	const userId = request.headers.get("userId");
	return userId ? Number.parseInt(userId) : 0;
};

export const validateUserId = (request: Request): void => {
	const userId = getUserId(request);
	if (userId === 0) throw UNAUTHORIZED_ERROR;
};

const extractAuthorization = (request: Request): string => {
	const authorization = request.headers.get("Authorization");
	const token = authorization ? authorization.split(" ")[1] : "";
	return token;
};

const extractUserId = (request: Request): number => {
	const token = extractAuthorization(request);
	const jwtData: JwtData = verifyJWT(token);
	return jwtData.userId;
};
