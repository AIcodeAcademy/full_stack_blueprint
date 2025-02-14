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
