export const getUrl = (request: Request): URL => {
	return new URL(request.url);
};

export const getPath = (request: Request): string => {
	return getUrl(request).pathname;
};

export const getParams = (request: Request): Record<string, string> => {
	return Object.fromEntries(getUrl(request).searchParams.entries());
};

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
