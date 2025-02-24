export type ErrorKind = "LOGIC" | "DATABASE" | "OTHER";
export class AppError extends Error {
	constructor(
		message: string,
		public kind: ErrorKind,
	) {
		super(message);
	}
}
