export const debug = (source: string, target: unknown) => {
	console.log(`DEBUG: ${source}`, target);
};

export const warn = (source: string, target: unknown) => {
	console.warn(`WARN: ${source}`, target);
};

export const error = (source: string, target: unknown) => {
	console.error(`ERROR: ${source}`, target);
};
