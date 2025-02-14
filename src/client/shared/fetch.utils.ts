export const post = async <T>(
	url: string,
	payload: unknown,
): Promise<ResponseBody<T>> => {
	const body = JSON.stringify(payload);
	const response = await fetch(url, { ...postOptions, body });
	return createResult<T>(response);
};

export const get = async <T>(url: string): Promise<ResponseBody<T>> => {
	const response = await fetch(url);
	return createResult<T>(response);
};

export type ResponseBody<T> = {
	body?: T;
	status: number;
	error?: string;
};

async function createResult<T>(response: Response): Promise<ResponseBody<T>> {
	const result = {
		body: response.status < 400 ? await response.json() : undefined,
		status: response.status,
		error: response.status >= 400 ? await response.text() : undefined,
	};
	return result;
}

const headers = {
	"Content-Type": "application/json",
};

const postOptions = {
	method: "POST",
	headers,
};
