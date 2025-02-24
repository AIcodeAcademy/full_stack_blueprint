export const debug = (source: string, target: unknown) => {
	console.log(`🔍 : ${source}`, target);
};

export const warn = (source: string, target: unknown) => {
	console.warn(`☣️  : ${source}`, target);
};

export const exception = (source: string, target: unknown) => {
	console.error(`🚨  : ${source}`, target);
};
